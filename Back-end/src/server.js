const express = require('express')


/*Importa el paquete cookie-parser, que es un middleware 
de Express que permite analizar y manejar cookies en las solicitudes HTTP.*/
const cookieParser = require('cookie-parser')

/* Importa el paquete body-parser, que es un middleware de Express que permite analizar y manejar
 el cuerpo de las solicitudes HTTP, incluyendo datos enviados en formularios o en formato JSON. */
const bodyParser = require('body-parser')

/*: Importa el paquete morgan, que es un middleware de Express que permite el registro de solicitudes 
HTTP en la consola para propósitos de depuración y seguimiento. */
const morgan = require('morgan')

/*es un middleware de Express que permite el manejo de políticas de control de acceso a recursos en la web,
 permitiendo o bloqueando solicitudes de diferentes orígenes. */
const cors = require('cors')

//es un middleware de Express que facilita la carga de archivos desde formularios en las solicitudes HTTP. 
const fileUpload = require('express-fileupload')

//para las rutas 
const routes = require("./routes/index.js")

// create server
const server = express()

// name server
server.name = 'API'

//server middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan('dev'))
server.use(cors())
server.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  createParentPath: true
}))


//  app.listen(3000, () => {
//     console.log('Servidor escuchando en el puerto 3000');
//    });




server.use('/', routes)

// error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

// server export
module.exports = server


// server.get('/', (req, res) => {
//     res.send('Hola desde la ruta raíz');
//   });
  
//   // Error catching middleware
//   server.use((err, req, res, next) => {
//     const status = err.status || 500;
//     const message = err.message || err;
//     console.error(err);
//     res.status(status).send(message);
//   });
  
// // Exportar instancia de la aplicación de Express
// module.exports = server