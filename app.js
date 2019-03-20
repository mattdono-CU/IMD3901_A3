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
app.get('/index', function(req, res) {
    res.sendFile(__dirname + 'public/index.html');
});
app.get('/roomA', function(req, res) {
    res.sendFile(__dirname + 'public/roomA.html');
});
app.get('/roomB', function(req, res) {
    res.sendFile(__dirname + 'public/roomB.html');
});
app.get('/winner', function(req, res) {
    res.sendFile(__dirname + 'public/winner.html');
});
app.get('/loser', function(req, res) {
    res.sendFile(__dirname + 'public/loser.html');
});

//S O C K E T   C O D E
socketIO.on('connection', function(socket) {    
    let buttonA     = false;
    let matchListA  = [];
    let buttonB     = false;
    let matchListB  = [];
    let reveal      = false;

    console.log('[' + socket.id + ' connected]')

    socket.on('disconnect', function() {
        console.log('[' + socket.id + ' disconnected]')
    });

    ///////////////////////////
    // R O O M   E V E N T S //
    ///////////////////////////
    //Console Button Pressed
    socket.on('buttonpressed', function(roomId) {
        if (roomId === "A") {
            buttonA = true;
        } else if (roomId === "B") {
            buttonB = true;
        }

        console.log('[Button A: ' + buttonA + ' | Button B: ' + buttonB + ']');

        if (buttonA && buttonB) {
            console.log('[Reveal Registered]');
            reveal = true;
            socketIO.sockets.emit('reveal');
        } else {
            console.log('[ColourShft @ Room' + roomId + ']');
            socketIO.sockets.emit('colourshift');
        }
    });
    //Console Button Released
    socket.on('buttonreleased', function(roomId) {
        if (roomId === "A") {
            buttonA = false;
        } else if (roomId === "B") {
            buttonB = false;
        }
        
        console.log('[Button A: ' + buttonA + ' | Button B: ' + buttonB + ']');

        if (reveal) {
            reveal = false;
            socketIO.sockets.emit('colourshift');
        }
    });
    //Block + Pad Match Found
    socket.on('matchfound', function(roomId, blockId) {
        console.log('Match Found: ' + blockId + ' @ ' + roomId);
        
        if (roomId === "A") {
            if (!matchListA.includes(blockId)) {
                matchListA.push(blockId);
                console.log(matchListA);
            }
            if (matchListA.length === 4) {
                console.log("Room A Wins!");
                socketIO.sockets.emit('gameover', 'A');
            }
        } else if (roomId === "B") {
            if (!matchListB.includes(blockId)) {
                matchListB.push(blockId);
                console.log(matchListB);
            }
            if (matchListB.length === 4) {
                console.log("Room B Wins!");
                socketIO.sockets.emit('gameover', 'B');
            }
        }
    });
    //Block + Pad Match Lost
    socket.on('matchlost', function(roomId, blockId) {
        console.log('Match Lost: ' + blockId + ' @ ' + roomId);
        
        if (roomId === "A") {
            if (matchListA.includes(blockId)) {
                matchListA.splice(matchListA.indexOf(blockId), 1);
            }
            console.log(matchListA);
        } else if (roomId === "B") {
            if (matchListA.includes(blockId)) {
                matchListA.splice(matchListA.indexOf(blockId), 1);
            }
            console.log(matchListB);
        }
    });
});

//start server
server.listen(LISTEN_PORT);
console.log('Listening on port: ' + LISTEN_PORT );