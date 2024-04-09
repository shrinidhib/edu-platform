require('dotenv').config()


const express = require('express')
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')
const mongoose =require('mongoose')
const forumRoutes = require('./routes/forum')
const userRoutes = require('./routes/user')
const Message = require('./models/messageModel')



const app = express()
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({
    origin:"*",
}))

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/forums',forumRoutes)
app.use('/api/user',userRoutes)

io.on('connection',(socket)=>{
    console.log('Client connected');
    socket.emit('message',"Welcome to the server");
})

io.on('sendMessage', async (content, createdBy, forumID) => {
  console.log("Message body:", content, createdBy, forumID);

  let emptyFields = [];

  if (!content) {
      emptyFields.push('content');
  }
  if (!forumID) {
      emptyFields.push('forumID');
  }
  if (!createdBy) {
      emptyFields.push('createdBy');
  }

  if (emptyFields.length > 0) {
      io.emit('error', { message: 'Please fill in all the fields', emptyFields });
      return;
  }

  try {
      const message = await Message.create({ content, createdBy, forumID });
      io.emit('displayMessage', { content: message.content, createdBy: message.createdBy, forumID: message.forumID });
  } catch (error) {
      io.emit('error', { message: error.message });
  }
});

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        server.listen(process.env.PORT, ()=>{
            console.log('Server Listening on 4005')
        })
    })
    .catch((error)=>{
        console.log(error)
    })
// listen for requests
