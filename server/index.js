const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
});

// io.on('connection', (socket) => {
//     console.log(`User Connected: ${socket.id}`);

//     socket.on('send_message', (data) => {
//         console.log(`Message from ${socket.id}: ${data.message}`);
//         socket.broadcast.emit('received_message', data);
//     });

//     socket.on('disconnect', () => {
//         console.log(`User Disconnected: ${socket.id}`);
//     });
// });

// to join a room 
io.on('connection',(socket)=>{
    console.log(`User Connected : ${socket.id}`)
    socket.on('join_room',(data)=> {
        socket.join(data);
    })

    socket.on('send_message',data => {
        socket.to(data.room).emit('received_message',data);
    })
})

server.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});
