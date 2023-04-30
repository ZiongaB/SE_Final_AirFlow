/**
 * This is the controller file that defines the how backend functions are
 * called to save and retrieve data relating to the hotel reservations
 * @author Zach East
 */

const { validationResult } = require('express-validator');
const HotelReserve = require('../models/hotelReserve');

//Export fetchAll to be used
exports.fetchAll = async (req, res, next) => {
  //Call fetchAll function
  
    const ID = req.params.id;
  try {
    const [allPosts] = await HotelReserve.fetchAll(ID);
    res.status(200).json(allPosts);
  //Catch Errors
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//Export posting function to be used
exports.postHotel = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  //Set constants to variable data
  const user = req.body.user;
  const tripname = req.body.tripname;
  const hotel = req.body.hotel;
  const checkin = req.body.checkin;
  const checkout = req.body.checkout;
  const cost = req.body.cost;

  //Create a post object using variables
  try {
    const post = {
      user: user,
      tripname: tripname,
      hotel: hotel,
      checkin: checkin,
      checkout: checkout,
      cost: cost,
    };

    //Call save function
    const result = await HotelReserve.save(post);
    res.status(201).json({ message: 'Posted!' });

  //Catch Errors
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteHotel = async (req,res,next)=>{
  try{    
    const deleteresponse =await HotelReserve.delete(req.params.id);
    res.status(200).json({deleteresponse});
}catch(err){
    console.log(err);
        if (!err.statusCode){
            console.log("error!");
            err.statusCode = 500;
        } 
        next(err)
    }
}