
knavesevents = {};

knavesevents.CardEnterPlayEvent = function(card, cardId, zoneId) {
    this.card = card;
    this.cardId = cardId;
    this.zoneId = zoneId;
    this.type = 'CARD_ENTER_PLAY';
};

knavesevents.CardChangeZones = function(cardId, fromZoneId, toZoneId) {
    this.cardId = cardId;
    this.fromZoneId = fromZoneId;
    this.toZoneId = toZoneId;
    this.type = 'CARD_CHANGE_ZONES';
};
