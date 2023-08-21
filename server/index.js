const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json()); //to accept json data

app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes);;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("db is connected");
})
.catch((ex)=>{
    console.log("db connection failed", ex);
});

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`);
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on('setup', (userData)=>{
        socket.join(userData.id);
        socket.emit('connected');
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined room: "+ room);
    });

    socket.on('new message', (newMessageReceived)=>{
        var chat = newMessageReceived.chat;
        if(!chat.users) console.log("chat.users not defined");
        chat.users.forEach(user => {
            if(user._id === newMessageReceived.sender._id) return;
            socket.in(user._id).emit("message received",newMessageReceived);
        })
    })
})