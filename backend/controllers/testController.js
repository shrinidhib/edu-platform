const mongoose=require('mongoose')
const Test=require('../models/testModel')

const getAlltests=async(req,res)=>{
    try{
        const tests=await Test.find({}).sort({createdAt:-1})
        return res.status(200).json(tests)
    }catch(err){
        return res.status(400).json({error: err.message})
    }
}

const getTeacherTests=async(req,res)=>{
    const {teacherId}=req.params
  
    try{
        const tests = await Test.find({teacherId}).sort({createdAt:-1})
        return res.status(200).json(tests)

    }catch(err){
        return res.status(400).json({error: err.message})
    }
}

const fetchTest=async(req,res)=>{
    const {id}=req.params
    try{
        const test=await Test.find({_id:id})
        return res.status(200).json(test)
    }catch(err){
        return res.status(400).json({error: err.message})
    }
}

const createTest=async(req,res)=>{
    const {questions, title, teacherId}=req.body
    try{
        const test= await Test.create({questions,title,teacherId})
        return res.status(200).json(test)
    }catch(err){
        console.log(err.message)
        return res.status(400).json({error: err.message})
    }

}

const editTest=async(req,res)=>{
    const {id}=req.params
    const newQuestion=req.body.newQuestion
    const index=req.body.index
    try{
        let test=await Test.findOne({_id: id})
        test.questions[index]=newQuestion
        const updatedTest=await Test.findByIdAndUpdate(id, test,{new: true})
        return res.status(200).json(updatedTest)
    }catch(err){
        return res.status(400).json({error: err.message})
    }
}

const deleteTest=async(req,res)=>{
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg:"invalid id"})
    }
    const test=await Test.findOneAndDelete({_id: id})
    if (!test){
        return res.status(400).json({msg:"no such workout"})
    }

    res.status(200).json(test)
}

module.exports={
    getAlltests,
    getTeacherTests,
    fetchTest,
    createTest,
    editTest,
    deleteTest
}

