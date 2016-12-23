var express = require('express');
var router = express.Router();

/* GET main page: */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Texas Fossils',app_name:'texasfossils'});
});

module.exports = router;