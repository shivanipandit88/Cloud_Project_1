const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const uuid = require('uuid').v4;
var dt = new Date();

require('dotenv').config()

const awsConfig = {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
}

const s3 = new aws.S3(awsConfig);
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        console.log(file)
        var ext = path.extname(file.originalname)
      // cb(null, dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate() + '/' + file.originalname)
      cb(null, file.originalname)
    }
  })
})

module.exports = upload;