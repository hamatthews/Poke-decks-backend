const Deck = require('../models/deckModel');
const mongoose = require('mongoose');

const getAllDecks = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        const decks = await Deck.find();
        res.status(200).json(decks);    
    }
    catch (err) {
        res.status(400).json({error: err})
    }
}

const createNewDeck = async (req, res) => {
    try {
        const cardSpread = [];
        JSON.parse(req.body.cards).forEach(e => {
            cardSpread.push(e);
        })

        const deck = await Deck.create({name: req.body.name, cards: cardSpread});
        res.status(200).json(deck);
    }
    catch (err) {
        res.status(400).json({error: err});
    }
}

module.exports = {getAllDecks, createNewDeck};
