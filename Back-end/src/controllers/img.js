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
  }});

  const fileStream = fs.createReadStream(file);
  
  const uploadParams = {
    Bucket: 'imagenesprueba2',
    Key: 'my-image.png',
    Body: fileStream,
    ContentType: 'image/png',
    acl: "public-read"
  };
  const imageUrl = `https://${uploadParams.Bucket}.s3.us-east-2.amazonaws.com/${uploadParams.Key}`;


  try {
    const data = await s3.send(new PutObjectCommand(uploadParams));
    console.log("Image uploaded successfully: ", data);
      return imageUrl;
  } catch (err) {
    console.log("Error uploading image: ", err);
  }
}

module.exports = {uploadPhoto}