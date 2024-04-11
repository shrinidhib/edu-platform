require('dotenv').config()
const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const noteRoutes=require('./routes/notes')
const videoRoutes=require('./routes/videoRoutes')
const questionRoutes=require('./routes/question')
const testRoutes=require('./routes/test')
const userRoutes=require("./routes/userRoutes.js")
const scoreRoutes=require('./routes/score.js')
const forumRoutes = require('./routes/forum')
const http = require('http');
const socketIo = require('socket.io');
const Message = require('./models/messageModel')

const app=express()
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

app.use('/notes/', noteRoutes)
app.use('/questions/', questionRoutes)
app.use('/test/', testRoutes)
app.use("/users",userRoutes)
app.use("/videos",videoRoutes)
app.use("/score", scoreRoutes)
app.use('/forums',forumRoutes)

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
    app.listen(process.env.PORT,()=>{
        console.log('listening')
    })
})
    .catch((e)=>{
        console.log(e)
    })
