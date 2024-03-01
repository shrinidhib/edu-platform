const mongoose=require('mongoose')
const { Question }= require('../models/questionModel')

const createQuestion=async(req,res)=>{
    const {question, options, answer}=req.body
    try{
        const q= await Question.create({question,options,answer})
        return res.status(200).json(q)

    }catch(err){
        console.log(err)
        return res.status(400).json({error: err.message})
    }
}


const updateQuestion=async(req,res)=>{
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg:"invalid id"})
    }
    const {question, options, answer}=req.body
    const updatedQuestion=await Question.findOneAndUpdate({_id: id},{...req.body},{
        new: true
    })
    if (!updatedQuestion){
        return res.status(400).json({msg: "Update unsuccessful"})
    }
    res.status(200).json(updatedQuestion)


}


module.exports={
    createQuestion,
    updateQuestion

}