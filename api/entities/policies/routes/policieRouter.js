var express = require('express');
var router = express.Router();
var PolicieController = require('../controllers/policieController');
var AuthMiddleware = require('../../../middleware/authMiddleware');
var Validate = require('express-validation');
var policieValidation = require('../validations/policie.js');
var PermissionService = require('../../../../services/permissionService.js');

var routes = {
  getPoliciesByUserName : '/username'
}

var authMiddleware = new AuthMiddleware();
var permissionService = new PermissionService();

router.post(routes.getPoliciesByUserName, authMiddleware.isLogged, Validate(policieValidation.getPoliciesByUserName), function(req, res) {

  permissionService.hasPermission('getPoliciesByUserName', req.get("authorization"), function(err, result){
    if(err) return res.status(err.httpStatusCode).jsonp(err);

    PolicieController.getPoliciesByUserName(req.body.name, function(err, data){
      if(err) return res.status(err.httpStatusCode).jsonp(err);

      res.status(200).jsonp(data);
    })

  });

});

module.exports = router;
