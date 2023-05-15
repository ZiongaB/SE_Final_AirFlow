/**
 * This is where the http requests are sent from the services for flight reservations.
 * It passes the commmands to the controller file for flight reservations.
 * @author Zach East
 */
const express = require('express');
const { body } = require('express-validator');

//Set controller file
const eventController = require ('../controllers/flightReserve');

//Set up other constants
const auth =  require('../middleware/auth');
const router = express.Router();

//Pass get requests to eventcontroller fetchall function
router.get('/:id', auth, eventController.fetchAll);

//Pass post requests to eventcontroller postFlight function after validating information
router.post(
    '/',
    [
      auth,
      body('userId').trim().isLength({ min: 1 }).not().isEmpty(),
      body('tripname').trim().isLength({ min: 1 }).not().isEmpty(),
      body('flight').trim().isLength({ min: 1 }).not().isEmpty(),
      body('cost').trim().isLength({ min: 1 }).not().isEmpty(),
      body('time').trim().isLength({ min: 1 }).not().isEmpty(),
      body('tripid').trim().isLength({ min: 1 }).not().isEmpty()
    ],
    eventController.postFlight
);

//Pass delete requests to eventcontroller deleteFlight function
router.delete('/:id',auth,eventController.deleteFlight)

module.exports = router;