const express=require('express')
const { addVideo, getVideos } = require('../controllers/videoController')

const router=express.Router()

router.get('/',getVideos)
router.post('/', addVideo)

module.exports=router