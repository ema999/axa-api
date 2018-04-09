const jwt = require('jwt-simple');
const moment = require('moment');
const customError = require('../class/customError.js');
const request = require('request');

var AuthService = function(){

  this.secret = 'fe1a32ffon3if31915a379f3be5394b64dasdasd14794932';

  AuthService.prototype.checkCredentials = function (email, callback) {

    request('http://www.mocky.io/v2/5808862710000087232b75ac', function (error, response, body) {
      if (error) return callback(new customError('loginFailed'));

      // Find the correct client
      var clients = JSON.parse(body).clients;
      var login = false;
      var clientResult = false;

      clients.forEach(function(client) {
        if (client.email === email) {
          login = true;
          clientResult = client;
        }
      })

      if (!login) return callback(new customError('loginFailed'));

      return callback(null, clientResult);
    });

  }

  AuthService.prototype.generateToken = function (user, callback) {
    var payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    var expires = moment().add(20, 'hours').unix();

    var token = jwt.encode({
      iat: moment().unix(),
      exp: expires,
      payload: payload
    }, this.secret);

    if (!token) return callback(new customError('tokenGeneratorFailed'));
    callback(null, token);
  }

  AuthService.prototype.checkToken = function (token, callback) {
    try {
      if (jwt.decode(token, this.secret)) return callback(null, true);
    }
    catch(err) {
      console.error(err);
      return callback(new customError('invalidToken'));
    }
  }

  AuthService.prototype.decodeToken = function (token, callback) {
    try {
      var payload = jwt.decode(token.split(' ')[1], this.secret);
      if (payload) return callback(null, payload);
    }
    catch(err) {
      console.error(err);
      return callback(new customError('invalidToken'));
    }
  }

}

module.exports = AuthService;
