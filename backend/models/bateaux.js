const mongoose = require("mongoose");

const bateaux = new mongoose.Schema({
    nom: String,
    numero: { type: Number, unique: true },
    adresse: String,
    pays: String,
    marque: String,
    date_entre: Date,
    date_sortie: Date,
    marin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
});

module.exports = mongoose.model('bateaux', bateaux);