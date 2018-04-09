var AuthService = require('../../services/authService');

var AuthMiddleware = function(){

  AuthMiddleware.prototype.isLogged = function (req, res, next) {

    var authService = new AuthService();
    var auth = req.get("authorization");

    if (process.env.ENVIROMENT === 'test') {

      authService.generateToken({
         "id":"a0ece5db-cd14-4f21-812f-966633e7be86",
         "name":"Britney",
         "email":"britneyblankenship@quotezart.com",
         "role":"admin"
      }, function(err, token){
        if (err) return res.status(401).send(err);
        req.headers['authorization'] =  'Barear '+token;
        return next();
      });

    }else{

      if (!auth) {
        res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
        return res.status(401).send("Authorization Required");
      } else {
        var token = auth.split(" ").pop();
        authService.checkToken(token, function(err, data){
          if (err) return res.status(401).send(err);
          return next();
        });
      }


    }



  }

}

module.exports = AuthMiddleware;
