const mongoose=require('mongoose')

const Schema=mongoose.Schema

const questionSchema=new Schema({
    question:{
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer:{
        type: String, 
        required: true
    }
});

module.exports={
    Question: mongoose.model('Question',questionSchema),
    questionSchema: questionSchema
}