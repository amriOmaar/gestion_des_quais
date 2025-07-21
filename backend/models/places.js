const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  estReservee: { type: Boolean, default: false },
  bateau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bateaux",
    default: null,
  },
  dateEntree: { type: Date, default: null },
  dateSortie: { type: Date, default: null },
});

module.exports = mongoose.model("places", placeSchema);