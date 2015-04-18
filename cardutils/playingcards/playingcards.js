
playingcards = {
    suits: [
        {name: "Clubs", value: 0},
        {name: "Diamonds", value: 13},
        {name: "Hearts", value: 26},
        {name: "Spades", value: 39}
    ],
    ranks: [
        {name: "2", value: 0},
        {name: "3", value: 1},
        {name: "4", value: 2},
        {name: "5", value: 3},
        {name: "6", value: 4},
        {name: "7", value: 5},
        {name: "8", value: 6},
        {name: "9", value: 7},
        {name: "10", value: 8},
        {name: "J", value: 9},
        {name: "Q", value: 10},
        {name: "K", value: 11},
        {name: "A", value: 12}
    ],

    Card: function(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    },

    buildDeck: function() {
        var cards = new Array();

        for (var i = 0; i<this.suits.length; ++i) {
            for (var j = 0; j<this.ranks.length; ++j) {
                cards.push(new this.Card(this.ranks[j], this.suits[i]));
            }
        }

        return cards;
    },

    cardValue: function(card) {
        return card.suit.value + card.rank.value;
    },

    highCard: function(cards) {
        var highestValue = -1;
        var highCard = null;

        for (var i = 0; i<cards.length; ++i) {
            var card = cards[i];
            var cardValue = this.cardValue(card);
            if (cardValue > highestValue) {
                highestValue = cardValue;
                highCard = card;
            }
        }

        return highCard;
    }
};

playingcards.Card.prototype.toString = function() {
    return this.rank.name + " of " + this.suit.name;
};
