const { validationResult } = require('express-validator');

const HotelReserve = require('../models/hotelReserve');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allPosts] = await HotelReserve.fetchAll();
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postHotel = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;
  
  const user = req.body.user;
  const tripname = req.body.tripname;
  const hotel = req.body.hotel;
  const checkin = req.body.checkin;
  const checkout = req.body.checkout;
  const cost = req.body.cost;

  try {
    const post = {
      user: user,
      tripname: tripname,
      hotel: hotel,
      checkin: checkin,
      checkout: checkout,
      cost: cost,
    };
    const result = await HotelReserve.save(post);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};