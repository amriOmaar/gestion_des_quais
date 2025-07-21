const express = require('express');
const router = express.Router();
const Marchandise = require('../models/marchandises');
const Bateau = require('../models/bateaux');

router.get('/getAllMarchandises', async (req, res) => {
  try {
    const marchandises = await Marchandise.find().populate('bateau', 'nom numero');
    res.status(200).json(marchandises);
  } catch (error) {
    console.error('Erreur lors de la récupération des marchandises :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

router.get('/getMarchandise/:id', async (req, res) => {
  try {
    const marchandise = await Marchandise.findById(req.params.id).populate('bateau', 'nom numero');
    if (!marchandise) return res.status(404).json({ message: 'Marchandise non trouvée.' });
    res.status(200).json(marchandise);
  } catch (error) {
    console.error('Erreur lors de la récupération :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

router.post('/addMarchandise', async (req, res) => {
  const { conteneur, description, bateau } = req.body;

  try {
    const existingConteneur = await Marchandise.findOne({ conteneur });
    if (existingConteneur) {
      return res.status(400).json({ message: 'Ce conteneur existe déjà.' });
    }

    const bateauExists = await Bateau.findById(bateau);
    if (!bateauExists) {
      return res.status(400).json({ message: 'Bateau invalide ou inexistant.' });
    }

    const newMarchandise = new Marchandise({
      conteneur,
      description,
      bateau
    });

    const saved = await newMarchandise.save();
    res.status(201).json({ message: 'Marchandise ajoutée avec succès.', marchandise: saved });

  } catch (error) {
    console.error('Erreur lors de l\'ajout :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

router.put('/updateMarchandise/:id', async (req, res) => {
  try {
    const updated = await Marchandise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Marchandise non trouvée.' });
    res.status(200).json({ message: 'Marchandise mise à jour.', marchandise: updated });
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

router.delete('/deleteMarchandise/:id', async (req, res) => {
  try {
    const deleted = await Marchandise.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Marchandise non trouvée.' });
    res.status(200).json({ message: 'Marchandise supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

module.exports = router;
