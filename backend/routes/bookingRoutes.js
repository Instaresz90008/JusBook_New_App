
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');

// Protected routes
router.get('/provider', auth, bookingController.getProviderBookings);
router.put('/:id/status', auth, bookingController.updateBookingStatus);

// Routes with optional authentication
router.post('/', optionalAuth, bookingController.createBooking);
router.get('/customer', optionalAuth, bookingController.getCustomerBookings);
router.delete('/:id', optionalAuth, bookingController.cancelBooking);
router.get('/:id', optionalAuth, bookingController.getBookingDetails);

module.exports = router;
