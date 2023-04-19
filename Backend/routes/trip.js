const express = require('express');

const { body } = require('express-validator');

const eventController = require ('../controllers/trip');

const auth =  require('../middleware/auth');

const router = express.Router();

router.get('/', auth, eventController.fetchAll);

router.post(
    '/',
    [
      auth,
      body('userId').trim().isLength({ min: 1 }).not().isEmpty(),
      body('tripname').trim().isLength({ min: 1 }).not().isEmpty(),
      body('parking').trim().isLength({ min: 1 }).not().isEmpty(),
      body('token'),
    ],
    eventController.postTrip
);

module.exports = router;