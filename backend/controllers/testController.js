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
    const {teacherId}=req.body
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
        return res.status(400).json({error: err.message})
    }

}

module.exports={
    getAlltests,
    getTeacherTests,
    fetchTest,
    createTest
}

