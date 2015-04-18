
knavesevents = {};

knavesevents.CardEnterPlayEvent = function(card, cardId, zoneId) {
    this.card = card;
    this.cardId = cardId;
    this.zoneId = zoneId;
    this.type = 'CARD_ENTER_PLAY';
};
