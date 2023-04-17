/**
 * This is the controller file that calls the backend functions
 * to save and retrieve data relating to the flight reservations
 * @author Zach East
 */
const { validationResult } = require('express-validator');

const FlightReserve = require('../models/flightReserve');

exports.fetchAll(user) = async (req, res, next) => {
  try {
    const [allPosts] = await FlightReserve.fetchAll(user);
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postFlight = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;
  
  const user = req.body.user;
  const tripname = req.body.tripname;
  const flight1 = req.body.flight1;
  const cost1 = req.body.cost1;
  const time1 = req.body.time1;

  const flight2 = req.body.flight2;
  const cost2 = req.body.cost2;
  const time2 = req.body.time2;

  try {
    const post = {
      user: user,
      tripname: tripname,
      flight1: flight1,
      cost1: cost1,
      time1: time1,
      flight2: flight2,
      cost2: cost2,
      time2: time2,
      
    };
    const result = await FlightReserve.save(post);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};