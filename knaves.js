
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

KnavesUI.prototype.createZone = function(zoneId, zone) {
    if (this.zones[zoneId])
        throw new Error('Tried to create zone with duplicate id: ' + zoneId);
    this.zones[zoneId] = zone;

    var zoneElement = this.zoneViewFactory(zone);
    zoneElement.id = zoneId;
    zoneElement.style.position = 'absolute';
    DOMUtils.addTransform(zoneElement, 'translate(' + zone.x + 'px, ' + zone.y + 'px)');
    this.canvasElement.appendChild(zoneElement);

    zone.cardDimensions = this.cardDimensions;
    zone.element = zoneElement;
    zone.performLayout();
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
        throw new Error('KnavesUI processed an unknown event type: ' + event.type);
    }
};

/**
 * Process a CardEnterPlayEvent
 *
 * Creates the ui element for the new card by calling the factory function,
 * then adds that card to the canvas and to the zone into which it enters play.
 */
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

/**
 * Process a CardChangeZones event
 *
 * Removes the card from the old zone, adds it to the new zone.
 * Both zones are then re-rendered.
 */
KnavesUI.prototype.changeZones = function(changeEvent) {
    console.log(changeEvent.cardId + ' moves from ' + changeEvent.fromZoneId + ' to ' + changeEvent.toZoneId);

    // Find the view associated with this card id
    var cardView = this.getCardView(changeEvent.cardId);
    cardView.zoneId = changeEvent.toZoneId;

    // Remove it from the old zone
    var oldZone = this.zones[changeEvent.fromZoneId];
    if (!oldZone)
        throw new Error('Tried to remove card from nonexistent zone: ' + changeEvent.fromZoneId);
    oldZone.removeCardElement(cardView);

    // Add it to the new zone
    var newZone = this.zones[changeEvent.toZoneId];
    if (!newZone)
        throw new Error('Tried to move card to nonexistent zone: ' + changeEvent.toZoneId);
    newZone.addCardElement(cardView);
};

/**
 * Process a CardTap event
 *
 * Mark's the card view's isTapped to true and causes the card's zone
 * to re-render.
 */
KnavesUI.prototype.tap = function(tapEvent) {
    console.log(tapEvent.cardId + ' taps');

    var cardView = this.getCardView(tapEvent.cardId);
    cardView.isTapped = true;

    var zone = this.zones[cardView.zoneId];
    zone.performLayout();
};

/**
 * Process a CardUntap event
 *
 * Mark's the card view's isTapped to false and causes the card's zone
 * to re-render.
 */
KnavesUI.prototype.untap = function(uptapEvent) {
    console.log(uptapEvent.cardId + ' untaps');

    var cardView = this.getCardView(uptapEvent.cardId);
    cardView.isTapped = false;

    var zone = this.zones[cardView.zoneId];
    zone.performLayout();
};