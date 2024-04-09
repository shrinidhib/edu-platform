const express=require('express');
const {createQuestion, updateQuestion}=require('../controllers/questionController');
const reqAuth =require("../middleware/reqAuth.js")

const router=express.Router()
router.use(reqAuth)
router.post('/', createQuestion )
router.patch('/:id', updateQuestion)

module.exports=router