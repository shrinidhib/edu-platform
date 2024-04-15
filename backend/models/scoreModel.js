const mongoose=require('mongoose')


const Schema=mongoose.Schema

const scoreSchema=new Schema({
    marks:{
        type: Number,
        required: true
    },
    testID:{
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports=mongoose.model('Score',scoreSchema)