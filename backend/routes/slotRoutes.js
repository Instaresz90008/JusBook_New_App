
const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const auth = require('../middleware/auth');
// const { generateSlots } = require('../controllers/slotController');

// Protected routes
router.post('/', auth, slotController.createSlots);
router.get('/service/:serviceId', auth, slotController.getServiceSlots);
router.get('/daterange', auth, slotController.getSlotsByDateRange);
router.put('/:id/availability', auth, slotController.updateSlotAvailability);
router.delete('/service/:serviceId', auth, slotController.deleteServiceSlots);
// router.post('/generate', slotController.generateSlots);

// Public routes
router.get('/public/service/:serviceId', slotController.getPublicServiceSlots);
router.get('/public/booking/:bookingLink', slotController.getSlotByBookingLink);

module.exports = router;
