
const express = require('express');
const conversationController = require('../controllers/conversationController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Process a voice query - accessible without authentication
router.post('/query', conversationController.processQuery);

// Protected routes - require authentication
router.get('/history/:userId', authMiddleware, conversationController.getUserHistory);
router.get('/:id', authMiddleware, conversationController.getConversation);

module.exports = router;
