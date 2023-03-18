const express = require('express');
const router = express.Router();
const {
    getAllDecks,
    createNewDeck
} = require('../controllers/deckController');

router.get('/', getAllDecks);

router.post('/', createNewDeck);

module.exports = router;