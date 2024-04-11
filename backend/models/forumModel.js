const mongoose=require('mongoose')

const Schema=mongoose.Schema

const forumSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    }
    
},{ timestamps: true })

module.exports = mongoose.model('Forum',forumSchema)
