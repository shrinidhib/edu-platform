import express from 'express';
import {createQuestion, updateQuestion} from '../controllers/questionController'

const router=express.Router()

router.post('/', createQuestion )
router.patch('/:id', updateQuestion)

module.exports=router