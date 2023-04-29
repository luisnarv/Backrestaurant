const http = require('http');
const WebSocketServer = require('websocket').server;

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
    console.log('Received message:', message.utf8Data);

    const reply = {
      sender: 'servidor',
      recipient: 'John',
      text: 'Hello John!'
    };

    connection.sendUTF(JSON.stringify(reply));
  });
});

module.exports = servidor






// const server = http.createServer(app);
// //const wss = new WebSocket.Server({ server });


// // const servidor = http.createServer((req, res)=>{
// //   res.writeHead(200, { 'Content-Type': 'text/plain' });
// //   res.end('Servidor creado!\n', );
// // });
// // Crear instancia del servidor WebSocket y pasarle el servidor HTTP
// servidor.listen(3000, () => {
//   console.log('HTTP server listening on port 3000')
// });
// const wsServer = new WebSocket({
//   httpServer: servidor,
// });
// // httpServer.listen(3000, () => {
// //   console.log('HTTP server listening on port 3000')
// // });





// wsServer.on('request', (req) => {
//   const connection = req.accept(null, req.origin);
//   console.log(connection)

// req.on('message', (message) => {
//   console.log('Received message:', message.utf8Data);
// })
//   connection.on('message', (message) => {
//     console.log('Received message:', message.utf8Data);
//     // Lógica para procesar el mensaje recibido
//   });


//   connection.on('close', (reasonCode, description) => {
//     // Lógica para manejar la desconexión del cliente
//   });
//   wss.on('connection', (ws) => {
//     console.log('Client connected');
    
//     ws.on('message', (message) => {
//       console.log(`Received message: ${message}`);
//       ws.send(`You sent: ${message}`);
//     });
    
//     ws.on('close', () => {
//       console.log('Client disconnected');
//     });
//   });
  
//   servidor.get('/wb', (req, res) => {
//     res.send('Hello, worldfsfaaaaaaaasdaasd!');
//   });

 

// });

// // servidor.listen(3000, () => {
// //     console.log('HTTP server listening on port 3000')
// //   });


