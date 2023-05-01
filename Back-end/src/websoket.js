const http = require('http');
const WebSocketServer = require('websocket').server;
const jwt = require('jsonwebtoken')
const { models } = require("./db");
const { Chat } = models


// Tabla que asocia ID de usuario con conexión WebSocket
const connections = [];

const servidor = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

const wsServer = new WebSocketServer({
  httpServer: servidor,
  autoAcceptConnections: true
});

wsServer.on('connect', (connection) => {
  console.log('Client connected!');


  connection.on('message', (message) => {
    const data = JSON.parse(message.utf8Data);
    // Obtener el ID de usuario del mensaje 
    const ID = data.token;
    // Obtener el texto del mensaje
    const content = data.message;

    const destino = data.destino



    // Verificar la firma del token
    let ed;
    try {
      const { id } = jwt.verify(ID, process.env.SECRET_JWT_KEY)
      ed = id
      // console.log("este es verificacion del token", ed)
      // console.log("todo bien todo correcto y yo que me alegro ")
    } catch (error) {
      console.log(error)
    }



    addConnection(ed, connection);

    //console.log("conection------------------->", connections)
    // Buscar la conexión del cliente destinatario


    const connectionDestino = connections.find(conn => conn.userID === destino);
    if (connectionDestino) {
      // Enviar la respuesta al cliente destinatario con el contenido del mensaje
      const response = {
        mensaje: content,
        remitente: ed,
        destinatario: destino
      };

      connectionDestino.connection.send(JSON.stringify(response));
    } else {
      console.log(`No se encontró la conexión para el cliente ${destino}`);
    }



    const create = async (ed, content, destino) => {
      const newchat = await Chat.create({
        mensaje: content, remitente: ed, destinatario: destino
      });
      //console.log("nuevo chat------------------------->>",newchat)
      return newchat;
    }
    create(ed, content, destino)
    // console.log("data", data)
    // console.log("userid", ID)
    // console.log("mensage.text", content)

    // connection.sendUTF(JSON.stringify(reply));

  });


  connection.on('error', (error) => {
    console.log('Connection error:', error);
  });



});

// Función para agregar una conexión WebSocket a la tabla de conexiones
// function addConnection(id, connection) {
//   connections[id] = connection;
// }


function addConnection(id, connection) {
  connections.push({ userID: id, connection: connection });
}
module.exports = servidor