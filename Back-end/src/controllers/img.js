const fs = require('fs');
const { ACCESSKEYID, SECRETACCESSKEY, } = process.env
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');


const uploadPhoto = async (file) => {
  const s3 = new S3Client({
    region: 'us-east-2',
    // endpoint: 'https://accespoint-5hkmagrj8q9w5zuft8ycqzco3zndquse2a-s3alias.us-east-2.amazonaws.com'   //arn:aws:s3:us-east-2:802777283664:accesspoint/accespoint
    credentials: {
      accessKeyId: ACCESSKEYID,
      secretAccessKey: SECRETACCESSKEY
    }
  });
  console.log(file)
  const fileStream = fs.createReadStream(file.tempFilePath);

  const uploadParams = {
    Bucket: 'imagenesprueba2',
    Key: file.name,
    Body: fileStream,
    ContentType: file.mimetype,
    acl: "public-read"
  };
  const imageUrl = `https://${uploadParams.Bucket}.s3.us-east-2.amazonaws.com/${uploadParams.Key}`;


  try {
    await s3.send(new PutObjectCommand(uploadParams));
    return imageUrl;
  } catch (err) {
    return "Error uploading image: ", err;
  }
}


const uploadPhotoproduct = async (file) => {
  const s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId: ACCESSKEYID,
      secretAccessKey: SECRETACCESSKEY
    }
  });

  const fileStream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: 'backimg',
    Key: file.name,
    Body: fileStream,
    ContentType: file.mimetype,
    acl: "public-read"
  };
  const imageUrl = `https://${uploadParams.Bucket}.s3.us-east-2.amazonaws.com/${uploadParams.Key}`;

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    return imageUrl;
  } catch (err) {
    return "Error uploading image: ", err;
  }
}

module.exports = { uploadPhoto, uploadPhotoproduct }