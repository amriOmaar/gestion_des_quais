const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
  res.send('API Users opérationnelle');
});

router.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

router.get('/getUser/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

router.post('/addUser', async (req, res) => {
  const {
    username, password, nom, prenom, tel, mail, poste, entreprise, role
  } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { tel }, { mail }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant (username, tel ou mail).' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      nom,
      prenom,
      tel,
      mail,
      poste,
      entreprise,
      role,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Utilisateur ajouté avec succès', user: savedUser });

  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const emp = await User.findOne({ username });
    if (!emp) {
      return res.status(401).json({ message: 'Nom d\'utilisateur incorrect.' });
    }

    const valid = await bcrypt.compare(password, emp.password);
    if (!valid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const payload = {
      _id: emp._id,
      username: emp.username,
      nom: emp.nom,
      prenom: emp.prenom,
      tel: emp.tel,
      entreprise: emp.entreprise,
      poste: emp.poste,
      role: emp.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({ token });

  } catch (err) {
    console.error('Erreur lors du login :', err);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});


router.get("/profile", async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.put("/profile", async (req, res) => {
  const { firstName, lastName, email, phone, bio } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName, email, phone, bio },
    { new: true }
  );
  res.json(user);
});


router.put('/updateUser/:id', async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    // Si un nouveau mot de passe est fourni, on le chiffre
    if (password) {
      rest.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      rest,
      { new: true, runValidators: true } // renvoie le user mis à jour et valide les contraintes du schéma
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ message: 'Utilisateur modifié avec succès', user: updatedUser });

  } catch (error) {
    console.error('Erreur lors de la modification de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});


router.delete('/deleteUser/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });

  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});



module.exports = router;