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

//S O C K E T   C O D E
socketIO.on('connection', function(socket) {
    let buttonA = false;
    let buttonB = false;
    let reveal  = false;

    console.log('[' + socket.id + ' connected]')

    socket.on('disconnect', function() {
        console.log('[' + socket.id + ' disconnected]')
    });

    //R O O M - A - E V E N T S
    socket.on('buttonApressed', function() {
        buttonA = true;

        if (buttonA && buttonB) {
            console.log('[Reveal Registered-A]');
            reveal = true;
            socketIO.sockets.emit('reveal');
        } else {
            console.log('[ColourShft Registered]');
            socketIO.sockets.emit('colourshift');
        }
    });
    socket.on('buttonAreleased', function() {
        buttonA = false;
        console.log('buttonA: ' + buttonA);

        if (reveal) {
            reveal = false;
            socketIO.sockets.emit('colourshift');
        }
    });

    //R O O M - B - E V E N T S
    socket.on('buttonBpressed', function() {
        buttonB = true;

        if (buttonB && buttonA) {
            console.log('[Reveal Registered-B]');
            reveal = true;
            socketIO.sockets.emit('reveal');
        } else {
            console.log('[ColourShft Registered]');
            socketIO.sockets.emit('colourshift');
        }
    });
    socket.on('buttonBreleased', function() {
        buttonB = false;
        console.log('buttonB: ' + buttonB);

        if (reveal) {
            reveal = false;
            socketIO.sockets.emit('colourshift');
        }
    });
});

//start server
server.listen(LISTEN_PORT);
console.log('Listening on port: ' + LISTEN_PORT );