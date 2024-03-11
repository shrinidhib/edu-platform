const express = require('express');
const { createMessage } = require('../controllers/forumController'); // Assuming you have a messageController
const requireAuth = require('../middleware/requireAuth'); // Assuming you have a requireAuth middleware

const router = express.Router();

// require auth for all message routes
//router.use(requireAuth);

// POST /forums/:forumId/messages: Creates a new message within a specific forum
router.post('/messages', createMessage);

// DELETE /forums/:forumId/messages/:messageId: Deletes a specific message within a forum
//router.delete('/:forumId/messages/:messageId', deleteMessage);

module.exports = router;
