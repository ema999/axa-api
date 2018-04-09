var AuthService = require('../../../../services/authService');
var PolicieService = require('../../../../services/politicieService');

var PoliticiController = {};

PoliticiController.getPoliciesByUserName = function(name, callback){
  var policieService = new PolicieService();

  policieService.getPoliciesByUserName(name, function(err, policies){
    if (err) return callback(err)
    callback(null, policies);
  })

}

module.exports = PoliticiController;
