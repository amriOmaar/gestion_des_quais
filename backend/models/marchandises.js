const mongoose = require("mongoose");

const marchandises = new mongoose.Schema({
    conteneur: { type: String, unique: true },
    description: String,
    bateau: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bateaux'
    },
});

module.exports = mongoose.model('marchandises', marchandises);