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
  autoAcceptConnections: true,  
});

wsServer.on('connect', (connection) => {
  console.log('Client connected!');
  //console.log(connections)

  connection.on('open', () => {
    const ID = connection.headers.token;
    addConnection(ID, connection);
  });


  connection.on( 'message', (message) => {
    const data = JSON.parse(message.utf8Data);
    const ID = data.token;
    const content = data.message;
    const destino = data.destino

    let ed;
    try {
      const { id } = jwt.verify(ID, process.env.SECRET_JWT_KEY)
      ed = id 
       console.log("este es el id ------------------->",id)
    } catch (error) {
      console.log("estoe s error",error)
    }


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
      return newchat;
    }
    if (ed){
    create(ed, content, destino)}
});


  connection.on('error', (error) => {
    console.log('Connection error:', error);
  });


});



function addConnection(ID, connection) {
  connections.push({ userID: ID, connection: connection });
}
module.exports = servidor








































/*--------------------------------------------------------------------------------------------------------------------------- */













// const http = require('http');
// const WebSocketServer = require('websocket').server;
// const jwt = require('jsonwebtoken')
// const { models } = require("./db");
// const { Chat } = models


// // Tabla que asocia ID de usuario con conexión WebSocket
// const connections = [];

// const servidor = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World!\n');
// });

// const wsServer = new WebSocketServer({
//   httpServer: servidor,
//   autoAcceptConnections: true,  
// });



// // wsServer.on('connect', (connection) => {
// //   console.log('Client connected!');
// //   console.log(connections)


// // //console.log("esto es conection------------>", connection)
// //   connection.on('open', () => {
// //     const ID = connection.headers.token;
// //     addConnection(ID, connection);
// //   });


// // console.log("esto es connections------------>",connections)

// // console.log("esto es wsServer---------.---------------------------->",wsServer)
// //   connection.on( 'message', (message) => {
// //     const data = JSON.parse(message.utf8Data);
// //     // Obtener el ID de usuario del mensaje 
// //     const ID = data.token;
// //     // Obtener el texto del mensaje
// //     const content = data.message;

// //     const destino = data.destino

// //  // addConnection(ID, connection);

// //     // Verificar la firma del token
// //     let ed;
// //     try {
// //       const { id } = jwt.verify(ID, process.env.SECRET_JWT_KEY)
// //       ed = id
// //       // console.log("este es verificacion del token", ed)
// //       // console.log("todo bien todo correcto y yo que me alegro ")
// //     } catch (error) {
// //       console.log(error)
// //     }

  

// //     //console.log("conection------------------->", connections)
// //     // Buscar la conexión del cliente destinatario


// //     const connectionDestino = connections.find(conn => conn.userID === destino);
// //     if (connectionDestino) {
// //       // Enviar la respuesta al cliente destinatario con el contenido del mensaje
// //       const response = {
// //         mensaje: content,
// //         remitente: ed,
// //         destinatario: destino
// //       };
// //       connectionDestino.connection.send(JSON.stringify(response));
// //     } else {
// //       console.log(`No se encontró la conexión para el cliente ${destino}`);
// //     }



// //     const create = async (ed, content, destino) => {
// //       const newchat = await Chat.create({
// //         mensaje: content, remitente: ed, destinatario: destino
// //       });
// //       //console.log("nuevo chat------------------------->>",newchat)
// //       return newchat;
// //     }
// //     create(ed, content, destino)
// //     // console.log("data", data)
// //     // console.log("userid", ID)
// //     // console.log("mensage.text", content)

// //     // connection.sendUTF(JSON.stringify(reply));

// //   });


// //   connection.on('error', (error) => {
// //     console.log('Connection error:', error);
// //   });



// // });



// function addConnection(ID, connection) {
//   connections.push({ userID: ID, connection: connection });
// }
// module.exports = servidor