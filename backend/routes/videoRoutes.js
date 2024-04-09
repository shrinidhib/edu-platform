const express =require( "express")
const Video =require("../models/videoModel.js")
const reqAuth =require("../middleware/reqAuth.js")


const router=express.Router()
router.use(reqAuth)

router.get("/all",async (req,res)=>{
    try{
        const videos=await Video.find({}).sort({createdAt:-1}) //find all
        res.status(200).json(videos)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
})
router.get("/filter/:id",async (req,res)=>{
    try{
        const id=req.params.id
        const videos=await Video.find({teacher_id:id}).sort({createdAt:-1}) //find by teacher id
        res.status(200).json(videos)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
})

router.post('/addvideos',async(req,res)=>{
    const url=req.body.url
    const title=req.body.title
    if (!url || !title){
        return res.status(400).json({'error': "please fill all fields "})
    }
    try{
        const video=await Video.create({url,title,teacher_id:req.body.teacher_id})
        res.status(200).json(video)
    }catch(err){
        res.status(400).json({error: err.message})
    }
})

router.delete('/removevideo/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const video=await Video.findByIdAndDelete(id)
        res.status(200).json({video})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
})

module.exports=router