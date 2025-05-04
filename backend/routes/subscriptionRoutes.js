
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');

// All routes require authentication
router.post('/', auth, subscriptionController.createSubscription);
router.get('/active', auth, subscriptionController.getActiveSubscription);
router.get('/history', auth, subscriptionController.getSubscriptionHistory);
router.delete('/:id', auth, subscriptionController.cancelSubscription);

// Billing transaction routes
router.post('/transaction', auth, subscriptionController.recordTransaction);
router.get('/transactions', auth, subscriptionController.getTransactionHistory);

module.exports = router;
