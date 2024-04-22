const express=require('express');
const {createScore, getScoresForUser, getScoresForTest, getAllScores}=require('../controllers/scoreController')

const router=express.Router()

router.post('/', createScore )

router.get('/',getAllScores)

router.get('/:id',getScoresForUser)

router.get('/test/:testID',getScoresForTest)


module.exports=router