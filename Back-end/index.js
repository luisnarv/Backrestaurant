
require('dotenv').config()

const sequelize = require("./src/db.js")
const server = require("./src/server.js")
const servidor = require("./src/websoket.js")
const mongoose = require("./src/dbMongo.js")


const { PORT, DB_FORCE } = process.env
sequelize.sync({ force: DB_FORCE ? true : false }).then(() => {
    console.log((`database connection successful`))
    server.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`)
    })
    servidor.listen(3000,() => {
        console.log(`server listening on port 3000`)})
}).catch((error) => console.log("error2023",error.message))


mongoose.connectToDatabase();














/*------------------ servidor HTTP -------------------*/

//cargar el modulo HTTP
// var http= require("http")
// //configurar una respuesta HTTP par todas las peticiones 
// function onRequest(request,response){
//     console.log("Petició recibida.");
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write("Hola mundo");
//     response.end();
// }
// var server = http.createServer(onRequest);
// //Escuchando en el puerto 3000
//  server.listen(3000);