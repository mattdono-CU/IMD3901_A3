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
app.get('/roomA', function(req, res) {
    res.sendFile(__dirname + 'public/roomA.html');
});
// app.get('/roomB', function(req, res) {
//     res.sendFile(__dirname + 'public/roomB.html');
// });

//Socket.io Code
socketIO.on('connection', function(socket) {
    console.log('[' + socket.id + ' connected]')

    socket.on('disconnect', function() {
        console.log('[' + socket.id + ' disconnected]')
    });

    socket.on('buttonApressed', function() {
        console.log('[Colour Shift Registered]');
        socketIO.sockets.emit('colourshift');
    });
});

//start server
server.listen(LISTEN_PORT);
console.log('Listening on port: ' + LISTEN_PORT );