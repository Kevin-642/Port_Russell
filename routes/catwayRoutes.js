/**
 * @fileoverview API pour gérer les catways (créer, lister, mettre à jour et supprimer)
 * @module CatwayController
 */

const express = require('express');
const router = express.Router();
const CatwayController = require('../controllers/catwayController.js');

/**
 * Créer un nouveau catway.
 * @route POST /catways/create
 * @group Catways - Opérations sur les catways
 * @param {string} req.body.catwayNumber - Numéro du catway
 * @param {string} req.body.type - Type du catway (long, court)
 * @param {string} req.body.catwayState - État du catway (Disponible, Réservé, etc.)
 * @returns {object} 201 - Catway créé avec succès
 * @returns {Error} 500 - Erreur serveur
 */

router.post('/create', CatwayController.createCatway);
router.patch('/update', CatwayController.updateCatway);
router.delete('/delete', CatwayController.deleteCatway);

/**
 * Récupérer les détails d'un catway par ID.
 * @route GET /catways/details/{id}
 * @group Catways - Opérations sur les catways
 * @param {string} id.path.required - ID du catway
 * @returns {object} 200 - Détails du catway
 * @returns {Error} 404 - Catway non trouvé
 * @returns {Error} 500 - Erreur serveur
 */

router.get('/details',CatwayController.getCatwayById);

/**
 * Récupérer la liste de tous les catways.
 * @route GET /catways/list
 * @group Catways - Opérations sur les catways
 * @returns {Array.<object>} 200 - Liste des catways
 * @returns {Error} 500 - Erreur serveur
 */

router.get('/list', CatwayController.getAllCatways);


module.exports = router;