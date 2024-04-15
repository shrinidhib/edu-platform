const express=require('express')

const router=express.Router()
const { getAlltests, getTeacherTests, fetchTest, createTest, editTest, getTestTitleById }=require('../controllers/testController')

router.get('/', getAlltests)
router.get('/mytests/:teacherId', getTeacherTests)
router.get('/:id',fetchTest )
router.post('/', createTest)
router.patch('/:id',editTest)
router.get('/title/:id',getTestTitleById)

module.exports=router