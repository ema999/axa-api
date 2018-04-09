var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');
var AuthMiddleware = require('../../../middleware/authMiddleware');
var Validate = require('express-validation');
var userValidation = require('../validations/user.js');
var PermissionService = require('../../../../services/permissionService.js');

var routes = {
  getUser : '/:id',
  getUserByName : '/name',
  login   : '/login',
  getUserByPoliticie   : '/policie/:policie'
}

var authMiddleware = new AuthMiddleware();
var permissionService = new PermissionService();

router.post(routes.login, Validate(userValidation.login), function(req, res) {

  UserController.login(req.body.email, function(err, data){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    res.status(200).jsonp(data);
  })

});


router.get(routes.getUser, authMiddleware.isLogged, function(req, res) {

  permissionService.hasPermission('getUser', req.get("authorization"), function(err, result){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    UserController.getUser(req.params.id, function(err, data){
      if(err) return res.status(err.httpStatusCode).jsonp(err);

      res.status(200).jsonp(data);
    })

  });

});

router.post(routes.getUserByName, authMiddleware.isLogged, Validate(userValidation.getUserByName), function(req, res) {

  permissionService.hasPermission('getUserByName', req.get("authorization"), function(err, result){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    UserController.getUserByName(req.body.name, function(err, data){
      if(err) return res.status(err.httpStatusCode).jsonp(err);

      res.status(200).jsonp(data);
    })

  });

});

router.get(routes.getUserByPoliticie, authMiddleware.isLogged, function(req, res) {

  permissionService.hasPermission('getUserByPoliticie', req.get("authorization"), function(err, result){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    UserController.getUserByPolicie(req.params.policie, function(err, data){
      if(err) return res.status(err.httpStatusCode).jsonp(err);

      res.status(200).jsonp(data);
    })

  });

});

module.exports = router;
