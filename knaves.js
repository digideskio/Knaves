
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

KnavesUI.prototype.createZone = function(zoneElementId, zone, x, y) {
    var zoneElement = document.createElement("div");
    zoneElement.style.position = 'absolute';
    DOMUtils.addTransform(zoneElement, 'translate(' + x + 'px, ' + y + 'px)');
    zoneElement.id = zoneElementId;

    zone.element = zoneElement;
    this.zones[zoneElementId] = zone;

    this.canvasElement.appendChild(zoneElement);
};

KnavesUI.prototype.createCardView = function(cardId, card) {
    var cardView = this.cardViewFactory(card);
    cardView.style.position = 'absolute';

    this.cardViews[cardId] = cardView;
    return cardView;
};

KnavesUI.prototype.processEvent = function(event) {
    if (event.type === 'CARD_ENTER_PLAY') {
        this.enterPlay(event);
    } else {
        console.log('KnavesUI processing an unknown event type');
    }
};

KnavesUI.prototype.enterPlay = function(enterPlay) {
    console.log('A card enters play: ' + enterPlay.cardId + ' in zone ' + enterPlay.zoneId);

    // Create a UI element for this card
    var cardView = this.createCardView(enterPlay.cardId, enterPlay.card);

    // Put the card in the appropriate zone of play
    var zone = this.zones[enterPlay.zoneId];
    zone.addCardElement(cardView);
};