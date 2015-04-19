
zones = {};

var performLayout = function() {
    var xMargin = 5;
    var yMargin = 5;

    var x = xMargin;
    var y = yMargin;

    var maximumX = this.cardDimensions.width;
    var maximumY = this.cardDimensions.height;

    for (var i = 0; i<this.children.length; ++i) {
        var cardView = this.children[i];

        // Dimensions of the card based on orientation
        var cardWidth = cardView.isTapped ? this.cardDimensions.height : this.cardDimensions.width;
        var cardHeight = cardView.isTapped ? this.cardDimensions.width : this.cardDimensions.height;

        maximumX = Math.max(maximumX, x + cardWidth);
        maximumY = Math.max(maximumY, y + cardWidth);

        if (cardView.isTapped) {
            /* TODO - this is a terrible approximation of how to offset for the rotation
             * and needs to be developed further
             */
            var transform = 'translate('
                + (x + this.x + cardWidth/4)+ 'px, '
                + (y + this.y - cardHeight/4) + 'px)'
                + ' rotate(90deg)';
            DOMUtils.addTransform(cardView.element, transform);
        } else {
            var transform = 'translate('
                + (x + this.x)+ 'px, '
                + (y + this.y) + 'px)';
            DOMUtils.addTransform(cardView.element, transform);
        }

        x += this.xSpacing;
        if (!this.xOverlap) {
            x += cardWidth;
        }

        y += this.ySpacing;
    }

    if (this.dynamicSize) {
        this.element.style.width = (maximumX + xMargin) + 'px';
        this.element.style.height = (maximumY + yMargin) + 'px';
    }
};

var addCardElement = function(cardView) {
    this.children.push(cardView);
    this.performLayout();
};

var removeCardElement = function(cardView) {
    var index = this.children.indexOf(cardView);

    if (index == -1) {
        throw new Error('Tried to remove a card from zone it does not belong to');
    }

    this.children.splice(index, 1);
    this.performLayout();
};

zones.Horizontal = function(x, y) {
    this.x = x;
    this.y = y;
    this.children = new Array();
    this.xSpacing = 10; // distance between right and left edges of cards
    this.ySpacing = 0;
};
zones.Horizontal.prototype.performLayout = performLayout;
zones.Horizontal.prototype.addCardElement = addCardElement;
zones.Horizontal.prototype.removeCardElement = removeCardElement;

zones.HorizontalTight = function(x, y) {
    this.x = x;
    this.y = y;
    this.children = new Array();

    this.xOverlap = true;
    this.xSpacing = 20; // distance between left edges of cards
    this.ySpacing = 0;
};
zones.HorizontalTight.prototype.performLayout = performLayout;
zones.HorizontalTight.prototype.addCardElement = addCardElement;
zones.HorizontalTight.prototype.removeCardElement = removeCardElement;

zones.Pile = function(x, y) {
    this.x = x;
    this.y = y;
    this.children = new Array();
    this.xSpacing = 0;
    this.ySpacing = 0;
};
zones.Pile.prototype.performLayout = performLayout;
zones.Pile.prototype.addCardElement = addCardElement;
zones.Pile.prototype.removeCardElement = removeCardElement;