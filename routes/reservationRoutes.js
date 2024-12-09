const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');

// Routes CRUD pour les réservations
router.post('/create', ReservationController.createReservation);
router.delete('/delete', ReservationController.deleteReservation);
router.get('/details', ReservationController.getReservationById);
router.get('/list', ReservationController.getAllReservations);

module.exports = router;
