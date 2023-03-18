const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
    name: {type: String, required: true},
    cards: {type: Array}
})

module.exports = mongoose.model('Deck', deckSchema);