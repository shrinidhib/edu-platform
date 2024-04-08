require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const questionRoutes=require('./routes/question')
const testRoutes=require('./routes/test')
const scoreRoutes=require('./routes/score')


const app=express()

app.use(cors())

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})



app.use('/questions/', questionRoutes)
app.use('/test/', testRoutes)
app.use('/score/',scoreRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening')
    })
})
    .catch((e)=>{
        console.log(e)
    })