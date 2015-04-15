# Knave's Canvas
Knave's Canvas is a rendering engine for card games of any kind - from traditional games like Whist and Poker to modern games like Yu Gi Oh and MTG.

http://knaves.meteor.com

## How it works
Knave's Canvas is based around two ideas:

1. Card games consist of distinct "zones" for cards to occupy
2. Card games have discrete events which move or transform cards

The playing area of any card game can be prepared by creating Zones. Each Zone is configured with a Layout that determines how the cards are arranged inside it.

###Examples of zones:

* In MTG, each player has a row of lands that are tightly packed horizontally
* In Solitaire, there 7 piles of cards that stack tightly packed vertically
* In Texas Hold Em, the flop is arranged horizintally with generous padding

###Examples of Events
* A card enters play in a certain Zone
* A card moves from one Zone to another
* A card is tapped (turned sideways)
* A card is flipped face up or face down

## Dependencies
Meteor https://www.meteor.com

## Running
``` meteor ```
