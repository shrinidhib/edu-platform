const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true,
    //ref: 'User' // Assuming you have a User model with this ID field
  },
  forumID: {
    type: String,
    required: true,
    //ref: 'Forum' // Assuming you have a Forum model with this ID field
  }
},{timestamps:true});

// Indexing for efficient queries
//messageSchema.index({ forumID: 1 });

module.exports = mongoose.model('Message', messageSchema);
