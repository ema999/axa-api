const customError = require('../class/customError.js');
const request = require('request');
const UserService = require('./userService.js');

var PoliciService = function(){

  PoliciService.prototype.getPoliciesByUserName = function (name, callback) {
    var userService = new UserService();
    var that = this;

    userService.getUser(name, 'name', function(err, user){
      if (err) return callback(err)

      if (!user.id) return callback(new customError('userDontExist'));

      request('http://www.mocky.io/v2/580891a4100000e8242b75c5', function (error, response, body) {
        if (error) return callback(new customError('unknownError'));

        var policies = JSON.parse(body).policies;
        var policiesResult = [];

        policies.forEach(function(policie) {
          if (policie.clientId === user.id) {
            policiesResult.push(policie);
          }
        })

        return callback(null, policiesResult);

      });

    })

  }



}

module.exports = PoliciService;
