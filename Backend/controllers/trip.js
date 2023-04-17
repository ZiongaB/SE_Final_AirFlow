const { validationResult } = require('express-validator');
const Trip = require('../models/trip');

exports.fetchAll(user) = async (req, res, next) => {
  try {
    const [allPosts] = await Trip.fetchAll(user);
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postTrip = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;
  
  const user = req.body.user;
  const tripname = req.body.tripname;
  const parking= req.body.parking;
  

  try {
    const post = {
      user: user,
      tripname: tripname,
      parking: parking,
      
    };
    const result = await Trip.save(post);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};