/**
 * This is where the http requests are sent from the services for hotel reservations.
 * It passes the commmands to the controller file for hotel reservations.
 * @author Zach East
 */
const express = require('express');
const { body } = require('express-validator');

//Set controller file
const eventController = require ('../controllers/hotelReserve');

//Set up other constants
const auth =  require('../middleware/auth');
const router = express.Router();

//Pass get requests to eventcontroller fetchall function
router.get('/:id', auth, eventController.fetchAll);

//Pass post requests to eventcontroller postHotel function after validating information
router.post(
    '/',
    [
      auth,
      body('userId').trim().isLength({ min: 1 }).not().isEmpty(),
      body('tripname').trim().isLength({ min: 1 }).not().isEmpty(),
      body('hotel').trim().isLength({ min: 1 }).not().isEmpty(),
      body('checkin').trim().isLength({ min: 1 }).not().isEmpty(),
      body('checkout').trim().isLength({ min: 1 }).not().isEmpty(),
      body('cost').trim().isLength({ min: 1 }).not().isEmpty(),
      body('tripid').stripLow().isLength({min:1}).not().isEmpty(),
    ],
    eventController.postHotel
);

//Pass delete requests to eventcontroller deleteHotel function
router.delete('/:id',auth,eventController.deleteHotel)

module.exports = router;