/**
 * This is the controller file that defines the how backend functions are
 * called to save and retrieve data relating to trips
 * @author Zach East
 */

const { validationResult } = require('express-validator');
const Trip = require('../models/trip');

//Export fetchAll to be used
exports.fetchAll = async (req, res, next) => {
  //const user = req.body.user;
  //Call fetchAll function
  const ID =req.params.id;
  //console.log(ID);
  try {
    const [allPosts] = await Trip.fetchUser(ID);
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
exports.postTrip = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return;


  //Set constants to variable data
  const user = req.body.userId;
  const tripname = req.body.tripname;
  const parking= req.body.parking;

  //Create a post object using variables
  try {
    const post = {
      user: user,
      tripname: tripname,
      parking: parking,
    };

    //Call save function
    const result = await Trip.save(post);
    res.status(201).json({ message: 'Posted!' });

    
  //Catch errors
  } catch (err) {
    if (!err.statusCode) {
      console.log(err);
      err.statusCode = 500;
    }
    next(err);
  }
};