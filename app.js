//app setup
const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server);

let buttonA     = false;
let buttonB     = false;
let users       = 0;

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

//S O C K E T   C O D E
//User - 1
if (users === 0) {
    socketIO.on('connection', function(socket) {
        console.log('[' + socket.id + ' connected]')

        users += 1;
        console.log('Users: ' + users);
        socketIO.sockets.emit('connected', users);

        let matchListA  = [];
        let matchListB  = [];
        let reveal      = false;
    
        socket.on('disconnect', function() {
            console.log('[' + socket.id + ' disconnected]')
            
            users -= 1;
            console.log('Users: ' + users);
            socketIO.sockets.emit('disconnected', users);
        });
    
        ///////////////////////////
        // R O O M   E V E N T S //
        ///////////////////////////
        //Console Button Pressed
        socket.on('buttonpressed', function(roomId) {
            console.log(roomId);
            if (roomId === "A") {
                buttonA = true;
                console.log('buttonA: ' + buttonA);
            } else if (roomId === "B") {
                buttonB = true;
                console.log('buttonB: ' + buttonB);
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
}

//User - 2
else if (users > 0) {
    socketIO.on('connection', function(socket) {
        console.log('[' + socket.id + ' connected]')

        users += 1;
        console.log('Users: ' + users);
        socketIO.sockets.emit('connected', users);

        let matchListA  = [];
        let matchListB  = [];
        let reveal      = false;
    
        socket.on('disconnect', function() {
            console.log('[' + socket.id + ' disconnected]')

            users -= 1;
            console.log('Users: ' + users);
            socketIO.sockets.emit('disconnected', users);
        });
    
        ///////////////////////////
        // R O O M   E V E N T S //
        ///////////////////////////
        //Console Button Pressed
        socket.on('buttonpressed', function(roomId) {
            console.log(roomId);
            if (roomId === "A") {
                buttonA = true;
                console.log('buttonA: ' + buttonA);
            } else if (roomId === "B") {
                buttonB = true;
                console.log('buttonB: ' + buttonB);
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
}

//start server
server.listen(LISTEN_PORT);
console.log('Listening on port: ' + LISTEN_PORT );