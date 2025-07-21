const mongoose = require("mongoose");

const users = new mongoose.Schema({
    username: { type: String, unique: true }, 
    password: String,
    nom: String,
    prenom: String,
    tel: { type: Number, unique: true },
    mail: { type: String, unique: true },
    entreprise: { type: String },
    poste: {
        type: String,
        enum: ['employee', 'marin']
    },
    role: {
        type: String,
        enum: ['admin', 'employee']
    }
});

module.exports = mongoose.model('users', users);