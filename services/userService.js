const jwt = require('jwt-simple');
const customError = require('../class/customError.js');
const AuthService = require('./authService.js');
const request = require('request');

var UserService = function(){

  UserService.prototype.getUser = function (field, by, callback) {

    request('http://www.mocky.io/v2/5808862710000087232b75ac', function (error, response, body) {
      if (error) return callback(new customError('unknownError'));

      var clients = JSON.parse(body).clients;
      var clientResult = false;

      clients.forEach(function(client) {
        if (client[by] === field) clientResult = client;
      })

      if (!clientResult) return callback(new customError('userDontExist'));

      return callback(null, clientResult);
    });

  }

  UserService.prototype.getUserByPolicie = function (policieId, callback) {
    var that = this;

    request('http://www.mocky.io/v2/580891a4100000e8242b75c5', function (error, response, body) {
      if (error) return callback(new customError('unknownError'));

      var policies = JSON.parse(body).policies;
      var policieResult = false;
      var clientId = false;

      policies.forEach(function(policie) {
        if (policie.id === policieId) {
          policieResult = policie;
          clientId = policie.clientId;
        }
      })

      if (!policieResult) return callback(new customError('policiesDontExist'));

      that.getUser(clientId, 'id', function(err, user){
        if (err) return callback(err)
        return callback(null, user);
      })

    });

  }

}

module.exports = UserService;
