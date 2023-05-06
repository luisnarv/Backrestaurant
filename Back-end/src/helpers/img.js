const AWS = require('aws-sdk');
const { ACCESSKEYID, SECRETACCESSKEY, backimg } = process.env

// const s3 = new AWS.S3({
//     accessKeyId: ACCESSKEYID,
//     secretAccessKey: SECRETACCESSKEY
// });


// const params = {
//     Bucket: 'backimg',
//     Key: 'ruta/del/archivo/nombre-del-archivo.jpg',
//     Body: fs.readFileSync('ruta/local/del/archivo/nombre-del-archivo.jpg')
//   };
  
//   s3.upload(params, function(err, data) {
//     if (err) {
//       console.log('Error al subir archivo:', err);
//     } else {
//       console.log('Archivo subido correctamente:', data.Location);
//     }
//   });

AWS.config.update({
  accessKeyId: ACCESSKEYID,
  secretAccessKey: SECRETACCESSKEY
});

const uploadPhoto = (file) =>{
const s3 = new AWS.S3();
const uploadParams = {
  Bucket: 'backimg',
  Key: 'NOMBRE_DE_ARCHIVO_EN_S3',
  Body: file,
  ContentType: 'TIPO_DE_CONTENIDO',
  ACL: 'public-read'
};

s3.upload(uploadParams, async function (err, data) {
  const imagen = data.Location
  console.log(imagen,"esto es imagen perrros")
  if (err) {
    console.log('Error al subir la imagen a S3: ', err);
  } else {
    console.log('Imagen subida a S3 exitosamente: ', data.Location)
  }
  return imagen
});
}

module.exports = {uploadPhoto}