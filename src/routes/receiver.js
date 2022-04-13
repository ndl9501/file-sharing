var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("receiver", { title: 'File Sharing' });
});

module.exports = router;
