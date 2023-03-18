const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardObj = {};

// const cards = Array(4).fill().map(() => (
//     {
//         name: {type: String, required: true},
//         cardType: {type: String, required: true},
//         hp: {type: Number},
//         damage: {type: Number},
//         url: {type: String, required: true}        
//     }  
// ));

const deckSchema = new Schema({
    name: {type: String, required: true},
    cards: {type: Array}
})

module.exports = mongoose.model('Deck', deckSchema);