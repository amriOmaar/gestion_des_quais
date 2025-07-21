const express = require("express");
const router = express.Router();
const Place = require("../models/places");
const Bateau = require("../models/bateaux");

router.get("/getAllPlaces", async (req, res) => {
  try {
    const places = await Place.find().populate("bateau", "nom numero");
    res.status(200).json(places);
  } catch (err) {
    console.error("Erreur getAllPlaces:", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

router.post("/addPlace", async (req, res) => {
  const { nom, estReservee, bateau, dateEntree, dateSortie } = req.body;

  try {
    const exists = await Place.findOne({ nom });
    if (exists) return res.status(400).json({ message: "Cette place existe déjà." });

    if (estReservee && bateau) {
      const bateauExists = await Bateau.findById(bateau);
      if (!bateauExists) {
        return res.status(400).json({ message: "Bateau non valide." });
      }
    }

    const newPlace = new Place({
      nom,
      estReservee: !!estReservee,
      bateau: estReservee ? bateau : null,
      dateEntree: estReservee ? dateEntree : null,
      dateSortie: estReservee ? dateSortie : null,
    });

    const saved = await newPlace.save();
    res.status(201).json({ message: "Place ajoutée avec succès.", place: saved });
  } catch (err) {
    console.error("Erreur addPlace:", err);
    res.status(500).json({ message: "Erreur lors de l’ajout." });
  }
});

router.put("/updatePlace/:id", async (req, res) => {
  const { estReservee, bateau, dateEntree, dateSortie } = req.body;

  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place non trouvée." });

    if (estReservee && bateau) {
      const bateauExists = await Bateau.findById(bateau);
      if (!bateauExists) {
        return res.status(400).json({ message: "Bateau invalide." });
      }

      place.estReservee = true;
      place.bateau = bateau;
      place.dateEntree = dateEntree;
      place.dateSortie = dateSortie;
    } else {
      place.estReservee = false;
      place.bateau = null;
      place.dateEntree = null;
      place.dateSortie = null;
    }

    const updated = await place.save();
    res.status(200).json({ message: "Place mise à jour.", place: updated });
  } catch (err) {
    console.error("Erreur updatePlace:", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

router.delete("/deletePlace/:id", async (req, res) => {
  try {
    const deleted = await Place.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Place introuvable." });

    res.status(200).json({ message: "Place supprimée." });
  } catch (err) {
    console.error("Erreur deletePlace:", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
