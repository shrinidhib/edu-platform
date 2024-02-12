const mongoose=require('mongoose')
const Note=require('../models/noteModel')

const getUserNotes=async(req,res)=>{
    //add user id later
    // const user_id=req.user._id
    const user_id=3
    const notes = await Note.find({user_id}).sort({createdAt:-1})
    res.status(200).json(notes)
}

const createNote=async(req,res)=>{
    const {title,content}=req.body
    let emptyFields=[]
    if (!title){
        emptyFields.push('title')
    }
    if(!content){
        emptyFields.push('content')
    }
    if (emptyFields.length>0){
        return res.status(400).json({error: 'Please fill all fields', emptyFields})
    }
    try{
        // const user_id=req.user._id
        const user_id=3
        const note=await Note.create({title,content,user_id})
        res.status(200).json(note)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const deleteNote=async(req,res)=>{
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg:"invalid id"})
    }
    const note=await Note.findOneAndDelete({_id: id})
    if (!note){
        return res.status(400).json({msg:"no such workout"})
    }

    res.status(200).json(note)
}

const updateNote=async(req,res)=>{
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg:"invalid id"})
    }
    const note=await Note.findOneAndUpdate({_id: id},{...req.body},{
        new: true
    })
    if (!note){
        return res.status(400).json({msg: "no such workout"})
    }
    res.status(200).json(note)
}

module.exports={
    getUserNotes,
    createNote,
    deleteNote,
    updateNote
}