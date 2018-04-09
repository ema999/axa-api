var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var expect = chai.expect;

chai.use(chaiHttp);

describe('User entity', function() {

  describe('Get User', function() {
    it('get correct users type', function(done) {

      chai.request(app)
        .get('/api/user/44e44268-dce8-4902-b662-1b34d2c10b8e')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('email');
          done();
        });

    });
  });

  describe('Get User Of Policie', function() {
    it('get correct user of policie', function(done) {

      chai.request(app)
        .get('/api/user/policie/64cceef9-3a01-49ae-a23b-3761b604800b')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('email');
          done();
        });

    });
  });

});
