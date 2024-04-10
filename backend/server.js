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

const app=express()

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

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening')
    })
})
    .catch((e)=>{
        console.log(e)
    })
