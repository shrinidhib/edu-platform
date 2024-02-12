const { response } = require('express')
const mongoose=require('mongoose')

const Schema=mongoose.Schema

const noteSchema=new Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true, 
        maxLength: 1500
    },
    user_id:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports=mongoose.model('Note',noteSchema)