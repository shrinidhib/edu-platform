
const Forum = require('../models/forumModel')
const Message= require('../models/messageModel')
const mongoose = require('mongoose')

// get all workouts
const getAllForums = async (req, res) => {
  //const user_id = req.user._id

  const forums = await Forum.find().sort({createdAt: -1})

  res.status(200).json(forums)
}


const getForum = async (req, res) => {
  try {
      const { id } = req.params;
      const forum = await Forum.findById(id);
      if (!forum) {
        return res.status(404).json({ message: 'Forum not found' });
      }
  
      // Find messages associated with the forum ID
      const messages = await Message.find({ forumID: id }).sort({ createdAt:1 });
  
      // Return forum data with associated messages
      res.json({ forum, messages });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving forum' });
    }
}


// create new workout
const createForum = async (req, res) => {
  const {title,description,createdBy} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!description) {
    emptyFields.push('description')
  }
  if(!createdBy) {
    emptyFields.push('createdBy')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    
    const forum = await Forum.create({title, description,createdBy})
    res.status(200).json(forum)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const createMessage = async (req, res) => {
  const {content,createdBy,forumID} = req.body

  console.log("Message body:",req.body)

  let emptyFields = []

  if(!content) {
    emptyFields.push('content')
  }
  if(!forumID) {
    emptyFields.push('forumID')
  }
  if(!createdBy) {
    emptyFields.push('createdBy')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    
    const message = await Message.create({content,createdBy,forumID})
    res.status(200).json(message)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

  

// delete a workout
const deleteForum = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such forum'})
  }

  const forum = await Workout.findOneAndDelete({_id: id})

  if (!forum) {
    return res.status(400).json({error: 'No such forum'})
  }

  res.status(200).json(forum)
}

module.exports = {
  getAllForums,
  getForum,
  createForum,
  createMessage,
  deleteForum
}