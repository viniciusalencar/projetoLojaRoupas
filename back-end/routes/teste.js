var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('testando: 1..2..3..');
});

module.exports = router;
