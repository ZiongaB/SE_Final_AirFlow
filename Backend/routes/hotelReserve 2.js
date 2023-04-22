const express = require('express');

const { body } = require('express-validator');

const eventController = require ('../controllers/hotelReserve');

const auth =  require('../middleware/auth');

const router = express.Router();

router.get('/', auth, eventController.fetchAll);

router.post(
    '/',
    [
      auth,
      body('user').trim().isLength({ min: 1 }).not().isEmpty(),
      body('tripname').trim().isLength({ min: 1 }).not().isEmpty(),
      body('hotel').trim().isLength({ min: 1 }).not().isEmpty(),
      body('checkin').trim().isLength({ min: 1 }).not().isEmpty(),
      body('checkout').trim().isLength({ min: 1 }).not().isEmpty(),
      body('cost').trim().isLength({ min: 1 }).not().isEmpty(),
    ],
    eventController.postHotel
);

module.exports = router;