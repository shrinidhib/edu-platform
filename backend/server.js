require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const noteRoutes=require('./routes/notes')


const app=express()

app.use(cors())

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

app.use('/notes/', noteRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening')
    })
})
    .catch((e)=>{
        console.log(e)
    })
