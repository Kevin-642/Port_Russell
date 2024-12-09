const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Catway = require('../models/Catway');

chai.use(chaiHttp);
const { expect } = chai;


describe('Catways', () => {
    
    // 1. Créer un catway
    it('should create a new catway', (done) => {
        const newCatway = {
            catwayNumber: 123,
            type: 'long',
            catwayState: 'Libre'
        };
        
        chai.request(app)
            .post('/catways/create')
            .send(newCatway)
            .end((err, res) => {
                expect(res).should.have.status(201);
                expect(res.body).should.be.a('object');
                expect(res.body).should.have.property('catwayNumber').eql(123);
                done();
            });
    });

    // 2. Lister l’ensemble des catways
    it('should list all catways', (done) => {
        chai.request(app)
            .get('/catways/list')
            .end((err, res) => {
                expect(res).should.have.status(200);
                expect(res.body).should.be.a('array');
                done();
            });
    });

    // 3. Récupérer les détails d’un catway en particulier
    it('should get details of a specific catway', (done) => {
        const catway = new Catway({ catwayNumber: 123, type: 'long', catwayState: 'Libre' });
        catway.save((err, catway) => {
            chai.request(app)
                .get(`/catways/details/${catway._id}`)
                .end((err, res) => {
                    expect(res).should.have.status(200);
                    expect(res.body).should.be.a('object');
                    expect(res.body).should.have.property('catwayNumber').eql(123);
                    done();
                });
        });
    });

    // 4. Modifier la description de l’état d’un catway en particulier
    it('should update the state of a specific catway', (done) => {
        const catway = new Catway({ catwayNumber: 123, type: 'long', catwayState: 'Libre' });
        catway.save((err, catway) => {
            chai.request(app)
                .post(`/catways/update/${catway._id}`)
                .send({ catwayState: 'Réservé' })
                .end((err, res) => {
                    expect(res).should.have.status(200);
                    expect(res.body).should.be.a('object');
                    expect(res.body).should.have.property('catwayState').eql('Réservé');
                    done();
                });
        });
    });

    // 5. Supprimer un catway
    it('should delete a specific catway', (done) => {
        const catway = new Catway({ catwayNumber: 123, type: 'long', catwayState: 'Libre' });
        catway.save((err, catway) => {
            chai.request(app)
                .post(`/catways/delete/${catway._id}`)
                .end((err, res) => {
                    expect(res).should.have.status(200);
                    expect(res.body).should.be.a('object');
                    done();
                });
        });
    });
});
