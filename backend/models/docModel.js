const mongoose=require('mongoose')

const Schema=mongoose.Schema

const docSchema=new Schema({
    file: {
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    teacher_id:{
        type:String,
        required:true
    }
},{timestamps: true})

module.exports = mongoose.model('doc',docSchema)