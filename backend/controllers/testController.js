const mongoose=require('mongoose')
const Test=require('../models/testModel')

const getAlltests=async(req,res)=>{
    try{
        const tests=await Test.find({}).sort({createdAt:-1})
        res.status(200).json(tests)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

