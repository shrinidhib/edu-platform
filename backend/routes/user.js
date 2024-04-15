const express=require('express')
const jwt =require("jsonwebtoken")
const User=require("../models/userModel.js")
require('dotenv').config()

const {getUser}=require('../controllers/userController.js')
const router=express.Router()

router.get('/getUser/:id',getUser)


const createToken=(_id)=>{
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:"3d"})
}

router.post("/login",async(req,res)=>{
    try{
        const user= await User.login(req.body.email,req.body.password)
        const token=createToken(user._id)
        res.status(200).json({email:req.body.email,token:token,recents:user.recents,user:user})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
})

router.post("/signup",async(req,res)=>{
    try{
        const user= await User.signup(req.body.email,req.body.password,req.body.designation)
        const token=createToken(user._id)
        res.status(200).json({email:req.body.email,token:token,recents:user.recents,user:user})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
})




module.exports=router