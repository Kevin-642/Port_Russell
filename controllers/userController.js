const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ name });
    if (existingUser) return res.status(400).json({ message: 'Nom d\'utilisateur déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.redirect('/')
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.render('userDetails', { user: null });
    res.render('userDetails', { user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId, newName, newPassword } = req.body;

    if (!userId) {
      return res.status(400).send('ID utilisateur requis');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'ID utilisateur non valide' });
    }

    const updatedData = {};
    if (newName) updatedData.name = newName;
    if (newPassword) {
  const salt = await bcrypt.genSalt(10);
  updatedData.password = await bcrypt.hash(newPassword, salt);
}

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).send('ID utilisateur requis');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send('ID utilisateur invalide');
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
  }
};

exports.getAllUser = async (req, res) => {
  try {
      const users = await User.find();
      res.render('usersList', { users });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
