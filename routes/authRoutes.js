const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Inscription', description: 'Créez votre compte ici' });
  });
  
  router.post('/signup', authController.signup);
  
  router.post('/login', authController.login);
  
  module.exports = router;
