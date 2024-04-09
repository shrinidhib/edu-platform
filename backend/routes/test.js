const express=require('express')

const router=express.Router()
const { getAlltests, getTeacherTests, fetchTest, createTest, editTest, deleteTest }=require('../controllers/testController')
const reqAuth =require("../middleware/reqAuth.js")

router.use(reqAuth)

router.get('/', getAlltests)
router.get('/mytests/:teacherId', getTeacherTests)
router.get('/:id',fetchTest )
router.post('/', createTest)
router.patch('/:id',editTest)
router.delete('/:id',deleteTest)

module.exports=router
