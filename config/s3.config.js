const AWS = require('aws-sdk');

const s3Client = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region : process.env.REGION
});
 
const uploadParams = {
         Bucket: process.env.Bucket, 
         Key: '', // pass key
         Body: null, // pass file body
};


const downloadParams = {
    Bucket: process.env.Bucket, 
    Key: '', // pass key
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;
s3.downloadParams = downloadParams;

module.exports = s3