var express = require('express');
var router = express.Router();

var guestController = require('../controllers/guestController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/user-sign-up', guestController.userSignUp);
router.post('/user-login', guestController.userLogin);

module.exports = router;
