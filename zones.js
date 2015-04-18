
zones = {};

var performLayout = function() {
    var xMargin = 5;
    var yMargin = 5;

    var x = xMargin;
    var y = yMargin;

    var width = this.cardDimensions.width;
    var height = this.cardDimensions.height;

    for (var i = 0; i<this.children.length; ++i) {
        var cardView = this.children[i];

        var cardWidth = this.cardDimensions.width; // TODO depends on if it's tapped
        var cardHeight = this.cardDimensions.height; // TODO depends on if it's tapped

        var transform = 'translate('
            + (x + this.x)+ 'px, '
            + (y + this.y) + 'px)';

        if (i<this.children.length-1) {
            x += this.xSpacing;
            width += this.xSpacing;
            if (!this.xOverlap) {
                x += cardWidth;
                width += cardWidth;
            }

            y += this.ySpacing;
            height += this.ySpacing;
        }

        DOMUtils.addTransform(cardView.element, transform);
    }

    this.element.style.width = width + 2*xMargin + 'px';
    this.element.style.height = height + 2*yMargin + 'px';
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