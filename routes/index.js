var express = require('express');
var router = express.Router();
var db = require('../db/mssql');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express ' + db.config.database });
});

module.exports = router;