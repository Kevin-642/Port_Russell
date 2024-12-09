const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Reservation = require('../models/Reservation');

chai.use(chaiHttp);
const { expect } = chai;


describe('Reservations', () => {
    // 6. Prendre la réservation d’un catway
    it('should create a new reservation', (done) => {
        const newReservation = {
            catwayNumber: 123,
            clientName: 'Jane Doe',
            boatName: 'Titanic II',
            checkIn: '2024-12-10',
            checkOut: '2024-12-20'
        };
        
        chai.request(app)
            .post('/reservations/create')
            .send(newReservation)
            .end((err, res) => {
                expect(res).should.have.status(201);
                expect(res.body).should.be.a('object');
                expect(res.body).should.have.property('catwayNumber').eql(123);
                done();
            });
    });

    // 7. Supprimer une réservation
    it('should delete a reservation', (done) => {
        const reservation = new Reservation({
            catwayNumber: 123,
            clientName: 'Jane Doe',
            boatName: 'Titanic II',
            checkIn: '2024-12-10',
            checkOut: '2024-12-20'
        });
        reservation.save((err, reservation) => {
            chai.request(app)
                .post(`/reservations/delete/${reservation._id}`)
                .end((err, res) => {
                    expect(res).should.have.status(200);
                    done();
                });
        });
    });

    // 8. Lister l’ensemble des réservations
    it('should list all reservations', (done) => {
        chai.request(app)
            .get('/reservations/list')
            .end((err, res) => {
                expect(res).should.have.status(200);
                expect(res.body).should.be.a('array');
                done();
            });
    });

    // 9. Afficher les détails d’une réservation en particulier
    it('should get details of a specific reservation', (done) => {
        const reservation = new Reservation({
            catwayNumber: 123,
            clientName: 'Jane Doe',
            boatName: 'Titanic II',
            checkIn: '2024-12-10',
            checkOut: '2024-12-20'
        });
        reservation.save((err, reservation) => {
            chai.request(app)
                .get(`/reservations/details/${reservation._id}`)
                .end((err, res) => {
                    expect(res).should.have.status(200);
                    expect(res.body).should.be.a('object');
                    expect(res.body).should.have.property('catwayNumber').eql(123);
                    done();
                });
        });
    });
});
