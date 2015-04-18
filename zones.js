
zones = {};

var performLayout = function() {
    for (var i = 0; i<this.element.children.length; ++i) {
        var cardElement = this.element.children[i];
        var position = this.getPosition(i);
        var transform = 'translate(' + position.x + 'px,' + position.y + 'px)';
        DOMUtils.addTransform(cardElement, transform);
    }
};

var addCardElement = function(cardElement) {
    this.element.appendChild(cardElement);
    this.performLayout();
};

var getPosition = function(index) {
    return {
        x: index * this.xSpacing,
        y: index * this.ySpacing
    };
}

zones.Horizontal = function() {
    this.xSpacing = 120; // TODO - derive this from card size
    this.ySpacing = 0;
};
zones.Horizontal.prototype.getPosition = getPosition;
zones.Horizontal.prototype.performLayout = performLayout;
zones.Horizontal.prototype.addCardElement = addCardElement;

zones.HorizontalTight = function() {
    this.xSpacing = 20; // TODO - derive this from card size
    this.ySpacing = 0;
};
zones.HorizontalTight.prototype.getPosition = getPosition;
zones.HorizontalTight.prototype.performLayout = performLayout;
zones.HorizontalTight.prototype.addCardElement = addCardElement;