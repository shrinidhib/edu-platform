const express=require('express');
const {createScore, getScoresForUser, getScoresForTest}=require('../controllers/scoreController')

const router=express.Router()

router.post('/', createScore )

router.get('/:id',getScoresForUser)

router.get('/test/:testID',getScoresForTest)


module.exports=router