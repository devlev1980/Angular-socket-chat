const express = require('express');
const socket = require('socket.io');
const port = 3000;
const app = express();
const server = app.listen(port,()=>{
    console.log('Server running')
});

const io  = socket(server);
io.on('connection',(socket)=>{
    console.log(`New connection: ${socket.id}`);

    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data)
    });
    socket.on('typing',(data)=>{
        io.sockets.emit('typing',data);
    });
})

