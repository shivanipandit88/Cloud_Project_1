var express = require('express');
var router = express.Router();
const app = express();
var userController = require('../controllers/users');
const upload = require('../config/aws');
//const aws_storage = require('../config/aws');

// router.post('/create',dbupload.createUser , uploadController.create);
/* GET home page. */
router.get('', userController.index);
router.post('/register', userController.register);


router.get('/login', userController.login);
router.post('/upload', userController.upload);

module.exports = router;