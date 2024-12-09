const Reservation = require('../models/Reservation');
const mongoose = require('mongoose');

exports.getAllReservations = async (req, res) => {
    try {
        const reservation = await Reservation.find();
        res.render('reservationsList', { reservation });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.query.reservationId);
        if (!reservation) return res.render('reservationDetails', { reservation: null });
        res.render('reservationDetails', { reservation });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

exports.createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body); 
        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const reservationId = req.body.reservationId;
    
        if (!reservationId) {
          return res.status(400).send('ID reservation requis');
        }
    
        if (!mongoose.Types.ObjectId.isValid(reservationId)) {
          return res.status(400).send('ID reservation invalide');
        }
    
        const reservation = await Reservation.findByIdAndDelete(reservationId);
    
        if (!reservation) {
          return res.status(404).send('Reservation non trouvé');
        }
    
        res.redirect('/');
      } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression de la reservation');
      }
    };