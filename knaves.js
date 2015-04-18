
KnavesUI = function(canvasElement, cardDimensions, cardViewFactory) {
    this.canvasElement = canvasElement;
    canvasElement.style.position = 'relative';

    /**
     * The standard dimensions of a card given as
     * {width, height}
     */
    this.cardDimensions = cardDimensions;

    /**
     * Function which returns a DOM element for a given card object
     */
    this.cardViewFactory = cardViewFactory;

    /**
     * A map from card ids to the card's visual element
     */
    this.cardViews = {};

    /**
     * A map from zone ids to the zone objects
     */
    this.zones = {};
};

KnavesUI.prototype.createZone = function(zoneElementId, zone) {
    var zoneElement = document.createElement("div");
    zoneElement.style.position = 'absolute';
    DOMUtils.addTransform(zoneElement, 'translate(' + zone.x + 'px, ' + zone.y + 'px)');
    zoneElement.id = zoneElementId;

    zone.element = zoneElement;
    this.zones[zoneElementId] = zone;

    this.canvasElement.appendChild(zoneElement);
};

KnavesUI.prototype.createCardView = function(cardId, card) {
    var cardView = this.cardViewFactory(card);
    cardView.className += ' knaves-card';
    cardView.style.position = 'absolute';

    this.cardViews[cardId] = cardView;
    return cardView;
};

KnavesUI.prototype.getCardView = function(cardId) {
    return this.cardViews[cardId];
};

KnavesUI.prototype.processEvent = function(event) {
    if (event.type === 'CARD_ENTER_PLAY') {
        this.enterPlay(event);
    } else if (event.type === 'CARD_CHANGE_ZONES') {
        this.changeZones(event);
    } else {
        console.log('KnavesUI processing an unknown event type');
    }
};

KnavesUI.prototype.enterPlay = function(enterPlay) {
    console.log(enterPlay.cardId + ' enters play in zone ' + enterPlay.zoneId);

    // Create a UI element for this card
    var cardView = this.createCardView(enterPlay.cardId, enterPlay.card);

    // This element enters the canvas
    this.canvasElement.appendChild(cardView);

    // Put the card in the appropriate zone of play
    var zone = this.zones[enterPlay.zoneId];
    zone.addCardElement(cardView);
};

KnavesUI.prototype.changeZones = function(change) {
    console.log(change.cardId + ' moves from ' + change.fromZoneId + ' to ' + change.toZoneId);

    // Find the view associated with this card id
    var cardView = this.getCardView(change.cardId);

    // Remove it from the old zone
    var oldZone = this.zones[change.fromZoneId];
    oldZone.removeCardElement(cardView);

    // add it to the new zone
    var newZone = this.zones[change.toZoneId];
    newZone.addCardElement(cardView);
}