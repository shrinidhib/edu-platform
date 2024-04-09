
const express=require('express')
const { getUserNotes, createNote, updateNote, deleteNote } = require('../controllers/notesController')
const reqAuth = require('../middleware/reqAuth')


const router=express.Router()

router.use(reqAuth)

router.get('/:id',getUserNotes)
router.post('/:id',createNote)
router.patch('/:id',updateNote)
router.delete('/:id', deleteNote)

module.exports=router