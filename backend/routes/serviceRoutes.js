
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const serviceValidator = require('../validators/serviceValidator');

// All routes require authentication except the public one
router.post('/', 
  auth, 
  validate(serviceValidator.createService), 
  serviceController.createService
);

router.get('/', auth, serviceController.getUserServices);
router.get('/public/:id', serviceController.getPublicService);
router.get('/:id', auth, serviceController.getService);

router.put('/:id', 
  auth, 
  validate(serviceValidator.updateService), 
  serviceController.updateService
);

router.delete('/:id', auth, serviceController.deleteService);

module.exports = router;
