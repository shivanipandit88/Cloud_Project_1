var express = require('express');
var router = express.Router();
const app = express();
var uploadController = require('../controllers/uploads');
const upload = require('../config/aws');
//const aws_storage = require('../config/aws');

// router.post('/create',dbupload.createUser , uploadController.create);
/* GET home page. */
// router.get('', uploadController.index);
router.post('/create', upload.array('uploads') , uploadController.create);
router.post('/delete', uploadController.delete);

module.exports = router;
