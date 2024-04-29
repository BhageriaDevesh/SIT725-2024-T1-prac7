const chai = require('chai'); // Assuming chai is still CommonJS
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming server.js is also an ES module

const expect = chai.expect;

// Configure chai
chai.use(chaiHttp);

describe('Cats API', () => {
    // Test POST /api/cats
    describe('POST /api/cats', () => {
        it('should create a new cat', (done) => {
            chai.request(app)
                .post('/api/cats')
                .send({ name: 'Whiskers', age: 3, breed: 'Persian' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('message').equal('Cat created successfully');
                    done();
                });
        });
    });

    // Test GET /api/cats
    describe('GET /api/cats', () => {
        it('should get all cats', (done) => {
            chai.request(app)
                .get('/api/cats')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    // Add more assertions as needed based on your application logic
                    done();
                });
        });
    });
});
