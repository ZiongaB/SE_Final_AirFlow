/**
 * This is the controller file that defines the how backend functions are
 * called to save and retrieve data relating to rental cars
 * @author Zach East
 */

const { validationResult } = require('express-validator');

const CarReserve = require('../models/carReserve');

exports.fetchAll(user) = async (req, res, next) => {
  try {
    const [allPosts] = await CarReserve.fetchAll(user);
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postCar = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;
  
  const user = req.body.user;
  const description = req.body.description;
  const tripname = req.body.tripname;
  const rentalinfo = req.body.rentalinfo;
  const pickup = req.body.pickup;
  const returntime = req.body.returntime;
  const cost = req.body.cost;


  try {
    const post = {
      user: user,
      description: description,
      tripname: tripname,
      rentalinfo: rentalinfo,
      pickup: pickup,
      returntime: returntime,
      cost: cost,
    };
    const result = await CarReserve.save(post);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};