//app setup
const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server);

//const vars
const LISTEN_PORT = 8080;

//middleware
app.use(express.static(__dirname + '/public'));

//set routes
app.get('/', function(req, res) {
    res.sendFile(__dirname + 'public/index.html');
});
// app.get('/', function(req, res) {
//     res.sendFile(__dirname + 'public/roomB.html');
// });

//start server
server.listen(LISTEN_PORT);
console.log('Listening on port: ' + LISTEN_PORT );