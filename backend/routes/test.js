const express=require('express')

const router=express.Router()
const { getAlltests, getTeacherTests, fetchTest, createTest }=require('../controllers/testController')

router.get('/', getAlltests)
router.get('/mytests/:teacherId', getTeacherTests)
router.get('/:id',fetchTest )
router.post('/', createTest)

module.exports=router
