/**
 * This is the controller file that defines the how backend functions are
 * called to save and retrieve data relating to flight reservations
 * @author Zach East
 */

const { validationResult } = require('express-validator');
const FlightReserve = require('../models/flightReserve');

//Export fetchAll to be used
exports.fetchAll = async (req, res, next) => {
  
    const ID = req.params.id;
  //Call fetchAll function
  try {
    const [allPosts] = await FlightReserve.fetchAll(ID);
    res.status(200).json(allPosts);

  //Catch Errors
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteFlight = async (req,res,next)=>{
  try{    
    const deleteresponse =await FlightReserve.delete(req.params.id);
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

//Export posting function to be used
exports.postFlight = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return;

  //Set constants to variable data
  const user = req.body.userId;
  const tripname = req.body.tripname;
  const flight = req.body.flight;
  const cost = req.body.cost;
  const time = req.body.time;
  const tripid = req.body.tripid;

  //Create a post object using variables
  try {
    const post = {
      user: user,
      tripname: tripname,
      flight: flight,
      cost: cost,
      time: time,
      tripid:tripid
    };
    //Call save function
    const result = await FlightReserve.save(post);
    res.status(201).json({ message: 'Posted!' });
    //Catch Errors
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};