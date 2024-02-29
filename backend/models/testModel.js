const mongoose=require('mongoose')
const { questionSchema } = require('./questionModel')

const Schema=mongoose.Schema

const testSchema=new Schema({
    questions:{
        type: [questionSchema],
        required: true
    },
    title:{
        type: String,
        required: true
    },
    teacherId:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports=mongoose.model('Test',testSchema)