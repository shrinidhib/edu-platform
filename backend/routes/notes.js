
const express=require('express')
const { getUserNotes, createNote, updateNote, deleteNote } = require('../controllers/notesController')


const router=express.Router()

router.get('/',getUserNotes)
router.post('/',createNote)
router.patch('/:id',updateNote)
router.delete('/:id', deleteNote)

module.exports=router