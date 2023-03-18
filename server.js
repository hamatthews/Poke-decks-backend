require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const deckRoutes = require('./routes/deckRoutes');

let roomList = {};

// connect the server
mongoose.connect(process.env.dbURI)
.then(() => {
    console.log('connected to db and listening on port ' + process.env.PORT)
    const server = app.listen(process.env.PORT)
    const io = require('socket.io')(server, {
        cors: {
            origin: '*'
        }
    })

    io.on('connection', socket => {
        let roomId;
        socket.on('connectPlayer', id => {
            roomId = id;

            socket.join(roomId);    


            if (!roomList[roomId]) {
                roomList[roomId] = 1
            }
            else {
                roomList[roomId]++
            }

            console.log(roomList)

            if (roomList[roomId] === 1) {
                socket.emit('initializePlayer')
    
            }
            else if (roomList[roomId] === 2) {
                socket.to(roomId).emit('requestData');
            }    
            else {
                socket.emit('routeToMatchMaker');
                roomList[roomId]--
                console.log(roomList)
                return;
            }

            socket.on('returnData', (payloadObj) => {
                socket.to(roomId).emit('initializePlayer', payloadObj)
            })

            socket.on('disconnect', () => {
                roomList[roomId]--
                if (roomList[roomId] <= 0) {
                    delete roomList[roomId];
                }
                socket.to(roomId).emit('disconnected');
            });
        });


        socket.on('startGame', () => {
            socket.to(roomId).emit('startGame');
        });

        socket.on('updateTurn', data => {
            socket.to(roomId).emit('updateTurn', data);
        });

        socket.on('myBoardChange', data => {
            if (roomList[roomId] === 2) {
                socket.to(roomId).emit('theirBoardChange', data);
            };
        });

        socket.on('clearTheirSelected', () => {
            socket.to(roomId).emit('clearMySelected');
        })

    });
})
.catch(err => console.error(err));

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors({origin: '*'}))

app.use((req, res, next) => {
    console.log(req.method, 'request made')
    next();
})

// routes
app.use('/api/decks', deckRoutes);

