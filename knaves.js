
KnavesUI = function(canvasElement, cardViewFactory) {

    this.canvasElement = canvasElement;

    this.cardViewFactory = cardViewFactory;

    /**
     * A map from card ids to the card's visual element
     */
    this.cardViews = {};

    /**
     * A map from zone ids to the zone elements
     */
    this.zoneViews = {};
};

KnavesUI.prototype.createZone = function(zoneElementId, zone) {
    var zoneElement = document.createElement("div");
    zoneElement.id = zoneElementId;
    zoneElement.className = zone.zoneElementCSS;
    this.zoneViews[zoneElementId] = zoneElement;

    this.canvasElement.appendChild(zoneElement);
};

KnavesUI.prototype.createCardView = function(cardId, card) {
    var cardView = this.cardViewFactory(card);
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
    var zoneElement = this.zoneViews[enterPlay.zoneId];
    zoneElement.appendChild(cardView);
};