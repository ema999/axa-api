var AuthService = require('../../../../services/authService');
var UserService = require('../../../../services/userService');

var UserController = {};

UserController.login = function(email, callback){
  var authService = new AuthService();

  authService.checkCredentials(email, function(err, user){
    if (err) return callback(err)

    authService.generateToken(user, function(err, token){
      if (err) return callback(err)
      callback(null, {token: token});
    })

  })

}

UserController.getUser = function(id, callback){
  var userService = new UserService();

  userService.getUser(id, 'id', function(err, user){
    if (err) return callback(err)
    callback(null, user);
  })

}

UserController.getUserByName = function(name, callback){
  var userService = new UserService();

  userService.getUser(name, 'name', function(err, user){
    if (err) return callback(err)
    callback(null, user);
  })

}

UserController.getUserByPolicie = function(politicie, callback){
  var userService = new UserService();

  userService.getUserByPolicie(politicie, function(err, user){
    if (err) return callback(err)
    callback(null, user);
  })

}

module.exports = UserController;
