
zones = {};

var performLayout = function() {
    for (var i = 0; i<this.children.length; ++i) {
        var cardElement = this.children[i];
        var position = this.getPosition(i);
        var transform = 'translate('
            + (position.x + this.x)+ 'px, '
            + (position.y + this.y) + 'px)';

        DOMUtils.addTransform(cardElement, transform);
    }
};

var addCardElement = function(cardElement) {
    this.children.push(cardElement);
    this.performLayout();
};

var removeCardElement = function(cardElement) {
    var index = this.children.indexOf(cardElement);

    if (index == -1) {
        throw new Error('Tried to remove a card from zone it does not belong to');
    }

    this.children.splice(index, 1);
    this.performLayout();
};

var getPosition = function(index) {
    return {
        x: index * this.xSpacing,
        y: index * this.ySpacing
    };
}

zones.Horizontal = function(x, y) {
    this.x = x;
    this.y = y;
    this.children = new Array();
    this.xSpacing = 120; // TODO - derive this from card size
    this.ySpacing = 0;
};
zones.Horizontal.prototype.getPosition = getPosition;
zones.Horizontal.prototype.performLayout = performLayout;
zones.Horizontal.prototype.addCardElement = addCardElement;
zones.Horizontal.prototype.removeCardElement = removeCardElement;

zones.HorizontalTight = function(x, y) {
    this.x = x;
    this.y = y;
    this.children = new Array();
    this.xSpacing = 20; // TODO - derive this from card size
    this.ySpacing = 0;
};
zones.HorizontalTight.prototype.getPosition = getPosition;
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
zones.Pile.prototype.getPosition = getPosition;
zones.Pile.prototype.performLayout = performLayout;
zones.Pile.prototype.addCardElement = addCardElement;
zones.Pile.prototype.removeCardElement = removeCardElement;