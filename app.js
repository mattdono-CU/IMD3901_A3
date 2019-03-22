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
app.get('/queue', function(req, res) {
    res.sendFile(__dirname + 'public/queue.html');
});

roomA           = false;
roomB           = false;
let buttonA     = false;
let buttonB     = false;
let reveal      = false;

//S O C K E T   C O D E
//User - 1
socketIO.on('connection', function(socket) {
    //console.log('[socket: ' + socket.id + ', connected]')

    let roomId      = '';
    let matchList   = [];

    if ((!roomA && !roomB) || (!roomA && roomB)) {
        roomId  = 'A';
        roomA   = true;
    } else if (roomA && !roomB) {
        roomId  = 'B';
        roomB   = true;
    } else if (roomA && roomB) {
        roomId  = 'Queue'
    }
    
    socketIO.sockets.emit('connected', roomId);
    console.log('User added to: ' + roomId);

    socket.on('disconnect', function() {
        if (roomId === 'A') {
            roomA = false;
        } else if (roomId === 'B') {
            roomB = false;
        }

        //console.log('[socket: ' + socket.id + ', disconnected]')
        //socketIO.sockets.emit('disconnected');
        console.log('User disconnected from: ' + roomId);
    });

    ///////////////////////////
    // R O O M   E V E N T S //
    ///////////////////////////
    //Console Button Pressed
    socket.on('buttonpressed', function(id) {
        //console.log(roomId);
        if (id === roomId) {
            if (roomId === 'A') {
                buttonA = true;
            } else if (roomId === 'B') {
                buttonB = true;
            }

            if (buttonA && buttonB) {
                console.log('[Reveal Registered]');
                reveal = true;
                socketIO.sockets.emit('reveal');
            } else {
                console.log('ColourShift from: ' + roomId);
                socketIO.sockets.emit('colourshift');
            }
        }
    });
    //Console Button Released
    socket.on('buttonreleased', function(id) {
        if (id === roomId) {
            if (roomId === 'A') {
                buttonA = false;
            } else if (roomId === 'B') {
                buttonB = false;
            }
                        
            if (reveal) {
                reveal = false;
                socketIO.sockets.emit('colourshift');
            }
        }
    });
    //Block + Pad Match Found
    socket.on('matchfound', function(block) {
        if (!matchList.includes(block)) {
            matchList.push(block);
            console.log('Room' + roomId + ' Matches: ' + matchList);
        }
        if (matchList.length === 4) {
            console.log('Room ' + roomId + ' Wins!');
            socketIO.sockets.emit('gameover', roomId);
        }
    });
    //Block + Pad Match Lost
    socket.on('matchlost', function(block) {
        if (matchList.includes(block)) {
            matchList.splice(matchList.indexOf(block), 1);
            console.log('Room ' + roomId + ' Matches: ' + matchList);
        }
    });
});

//start server
server.listen(LISTEN_PORT);
console.log('Listening on port: ' + LISTEN_PORT );