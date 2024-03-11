const express = require('express');
const {
  getAllForums,
  getForum,
  createForum,
  deleteForum,
  createMessage
} = require('../controllers/forumController'); // Assuming you have a forumController

const requireAuth = require('../middleware/requireAuth'); // Assuming you have a requireAuth middleware

const router = express.Router();

// require auth for all forum routes
//router.use(requireAuth);

// GET all forums
router.get('/', getAllForums);

// GET a specific forum
router.get('/:id', getForum);

// POST a new forum
router.post('/', createForum);

router.post('/messages',createMessage);

// DELETE a forum
router.delete('/:id', deleteForum);

module.exports = router;
