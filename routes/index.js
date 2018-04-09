let express = require('express');
let router = express.Router();
let html2jade = require('html2jade');
let fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  fs.readFile(__dirname + '/../views/index.html', 'utf8', function (err,data) {
    if (err) return console.log(err);

    html2jade.convertHtml(data, {}, function (err, jade) {

      indexPath = __dirname + '/../views/index.jade';

      fs.writeFile(indexPath, jade, function(err) {
        if (err) return console.log(err);

        let inicialState = {
          titulo : 'hola un titulo',
          otro   : 5
        }

        res.render('index', {inicialState: JSON.stringify(inicialState)});
      })

    })

  })

})

module.exports = router;
