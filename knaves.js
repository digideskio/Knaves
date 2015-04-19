
KnavesUI = function(canvasElement, cardDimensions, cardViewFactory, zoneViewFactory) {
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
     * Function which returns a DOM element for a given zone object
     */
    this.zoneViewFactory = zoneViewFactory;

    /**
     * A map from card ids to the card's view-model
     */
    this.cardViews = {};

    /**
     * A map from zone ids to the zone objects
     */
    this.zones = {};
};

KnavesUI.prototype.createZone = function(zoneElementId, zone) {
    zone.cardDimensions = this.cardDimensions;

    var zoneElement = this.zoneViewFactory(zone);
    zoneElement.id = zoneElementId;

    zone.element = zoneElement;
    this.zones[zoneElementId] = zone;

    zoneElement.style.position = 'absolute';
    zone.performLayout();
    DOMUtils.addTransform(zoneElement, 'translate(' + zone.x + 'px, ' + zone.y + 'px)');

    this.canvasElement.appendChild(zoneElement);
};

KnavesUI.prototype.createCardView = function(cardId, card) {
    var cardElement = this.cardViewFactory(card);
    cardElement.className += ' knaves-card';
    cardElement.style.position = 'absolute';

    var cardView = {
        isFaceDown: false,
        isTapped: false,
        element: cardElement
    };

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
    } else if (event.type === 'CARD_TAP') {
        this.tap(event);
    } else if (event.type === 'CARD_UNTAP') {
        this.untap(event);
    } else {
        console.log('KnavesUI processing an unknown event type');
    }
};

KnavesUI.prototype.enterPlay = function(enterPlay) {
    console.log(enterPlay.cardId + ' enters play in zone ' + enterPlay.zoneId);

    // Create a UI element for this card
    var cardView = this.createCardView(enterPlay.cardId, enterPlay.card);

    // This element enters the canvas
    this.canvasElement.appendChild(cardView.element);

    // Put the card in the appropriate zone of play
    var zone = this.zones[enterPlay.zoneId];
    cardView.zoneId = enterPlay.zoneId;
    zone.addCardElement(cardView);
};

KnavesUI.prototype.changeZones = function(change) {
    console.log(change.cardId + ' moves from ' + change.fromZoneId + ' to ' + change.toZoneId);

    // Find the view associated with this card id
    var cardView = this.getCardView(change.cardId);
    cardView.zoneId = change.toZoneId;

    // Remove it from the old zone
    var oldZone = this.zones[change.fromZoneId];
    oldZone.removeCardElement(cardView);

    // add it to the new zone
    var newZone = this.zones[change.toZoneId];
    newZone.addCardElement(cardView);
};

KnavesUI.prototype.tap = function(change) {
    console.log(change.cardId + ' taps');

    var cardView = this.getCardView(change.cardId);
    cardView.isTapped = true;

    var zone = this.zones[cardView.zoneId];
    zone.performLayout();
};

KnavesUI.prototype.untap = function(change) {
    console.log(change.cardId + ' untaps');

    var cardView = this.getCardView(change.cardId);
    cardView.isTapped = false;

    var zone = this.zones[cardView.zoneId];
    zone.performLayout();
};