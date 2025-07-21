const express = require('express');
const router = express.Router();
const Bateau = require('../models/bateaux'); 
const User = require('../models/users');

router.get('/getAllBateaux', async (req, res) => {
  try {
    const bateaux = await Bateau.find().populate('marin', 'nom prenom username');
    res.status(200).json(bateaux);
  } catch (error) {
    console.error('Erreur lors de la récupération des bateaux :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

router.get('/getBateau/:id', async (req, res) => {
  try {
    const bateau = await Bateau.findById(req.params.id).populate('marin', 'nom prenom username');
    if (!bateau) return res.status(404).json({ message: 'Bateau non trouvé.' });
    res.status(200).json(bateau);
  } catch (error) {
    console.error('Erreur lors de la récupération du bateau :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

router.post('/addBateau', async (req, res) => {
  const { nom, numero, adresse, pays, marque, date_entre, date_sortie, marin } = req.body;

  try {
    if (marin) {
      const marinExists = await User.findById(marin);
      if (!marinExists || marinExists.poste !== 'marin') {
        return res.status(400).json({ message: 'Le marin spécifié est invalide ou inexistant.' });
      }
    }

    const newBateau = new Bateau({
      nom,
      numero,
      adresse,
      pays,
      marque,
      date_entre,
      date_sortie,
      marin,
    });

    const savedBateau = await newBateau.save();
    res.status(201).json({ message: 'Bateau ajouté avec succès.', bateau: savedBateau });

  } catch (error) {
    console.error('Erreur lors de l\'ajout du bateau :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

router.put('/updateBateau/:id', async (req, res) => {
  try {
    const updatedBateau = await Bateau.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBateau) return res.status(404).json({ message: 'Bateau non trouvé.' });
    res.status(200).json({ message: 'Bateau mis à jour.', bateau: updatedBateau });
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

router.delete('/deleteBateau/:id', async (req, res) => {
  try {
    const deletedBateau = await Bateau.findByIdAndDelete(req.params.id);
    if (!deletedBateau) return res.status(404).json({ message: 'Bateau non trouvé.' });
    res.status(200).json({ message: 'Bateau supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

module.exports = router;
