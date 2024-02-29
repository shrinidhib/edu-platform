const express=require('express')

const router=express.Router()
const { getAlltests, getTeacherTests, fetchTest, createTest }=require('../controllers/testController')

router.get('/', getAlltests)
router.get('/mynotes/', getTeacherTests)
router.get('/:id',fetchTest )
router.post('/', createTest)
