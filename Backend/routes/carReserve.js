/**
 * This is where the http requests are sent from the services for car reservations.
 * It passes the commmands to the controller file for car reservations.
 * @author Zach East
 */
const express = require('express');
const { body } = require('express-validator');

//Set controller file
const eventController = require ('../controllers/carReserve');

//Set up other constants
const auth =  require('../middleware/auth');
const router = express.Router();

//Pass get requests to eventcontroller fetchall function
router.get('/:id', auth, eventController.fetchAll);

//Pass post requests to eventcontroller postCar function after validating information
router.post(
    '/',
    [
      auth,
      body('userId').trim().isLength({ min: 1 }).not().isEmpty(),
      body('description').trim().isLength({ min: 1 }).not().isEmpty(),
      body('tripname').trim().isLength({ min: 1 }).not().isEmpty(),
      body('rentalinfo').trim().isLength({ min: 1 }).not().isEmpty(),
      body('pickup').trim().isLength({ min: 1 }).not().isEmpty(),
      body('returntime').trim().isLength({ min: 1 }).not().isEmpty(),
      body('cost').trim().isLength({ min: 1 }).not().isEmpty(),
    ],
    eventController.postCar
);

//Pass delete requests to eventcontroller deleteCar function
router.delete('/:id',auth,eventController.deleteCar)

module.exports = router;