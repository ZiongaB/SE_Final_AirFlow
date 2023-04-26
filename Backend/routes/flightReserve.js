const express = require('express');

const { body } = require('express-validator');

const eventController = require ('../controllers/flightReserve');

const auth =  require('../middleware/auth');

const router = express.Router();

router.get('/:id', auth, eventController.fetchAll);

router.post(
    '/',
    [
      auth,
      body('userId').trim().isLength({ min: 1 }).not().isEmpty(),
      body('tripname').trim().isLength({ min: 1 }).not().isEmpty(),
      body('flight1').trim().isLength({ min: 1 }).not().isEmpty(),
      body('cost1').trim().isLength({ min: 1 }).not().isEmpty(),
      body('time1').trim().isLength({ min: 1 }).not().isEmpty(),
      body('flight2').trim().isLength({ min: 1 }).not().isEmpty(),
      body('cost2').trim().isLength({ min: 1 }).not().isEmpty(),
      body('time2').trim().isLength({ min: 1 }).not().isEmpty(),
    ],
    eventController.postFlight
);
router.delete('/:id',auth,eventController.deleteFlight)

module.exports = router;