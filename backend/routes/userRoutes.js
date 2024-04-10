const express=require('express')
const jwt =require("jsonwebtoken")
const User=require("../models/userModel.js")
require('dotenv').config()


const router=express.Router()
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
router.put("/update/:id",async (req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findOne({_id:id})
        const rec=user.recents
        for (const r of rec) {
            if (req.body.newItem.title === r.title) {
                return res.status(200).json({ message: "Already in recents" });
            }
        }
        if(rec.length>=5){
            rec.pop()
            rec.unshift(req.body.newItem)
        }
        else{
            rec.unshift(req.body.newItem)
        }
        const data={
            username:user.username,
            email:user.email,
            password:user.password,
            recents:rec
        }
        const userUp=await User.findByIdAndUpdate(id,data,{new:true})
        return res.status(200).json(userUp)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
})

router.get("/recents/:id",async(req,res)=>{
    const id=req.params.id
    const user=await User.findOne({_id:id})
    const rec=user.recents
    res.status(200).json({recents:rec});
})

module.exports=router