
const Video=require('../models/videoModel')

const getVideos=async(req,res)=>{
    const videos =await Video.find({}).sort({createdAt: -1})
    res.status(200).json(videos)
}

const addVideo=async(req,res)=>{
    const {url}=req.body
    let isEmpty=false
    if (!url){
        isEmpty=true
    }
    if (isEmpty){
        return res.status(400).json({'error': "please fill all fields "})
    }
    try{
        const video=await Video.create({url})
        res.status(200).json(video)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports={
    getVideos,
    addVideo,
}

