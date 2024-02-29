const express=require('express');
const {createQuestion, updateQuestion}=require('../controllers/questionController')

const router=express.Router()

router.post('/', createQuestion )
router.patch('/:id', updateQuestion)

module.exports=router