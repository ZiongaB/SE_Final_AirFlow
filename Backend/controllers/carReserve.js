/**
 * This is the controller file that defines the how backend functions are
 * called to save and retrieve data relating to rental cars
 * @author Zach East
 */

const { validationResult } = require('express-validator');
const CarReserve = require('../models/carReserve');

//Export fetchAll to be used
exports.fetchAll = async (req, res, next) => {
  
  const ID = req.params.id;
  //Call fetchAll function
  try {
    const [allPosts] = await CarReserve.fetchAll(ID);
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
exports.postCar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return;

  //Set constants to variable data
  const user = req.body.user;
  const description = req.body.description;
  const tripname = req.body.tripname;
  const rentalinfo = req.body.rentalinfo;
  const pickup = req.body.pickup;
  const returntime = req.body.returntime;
  const cost = req.body.cost;

  //Create a post object using variables
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

    //Call save function
    const result = await CarReserve.save(post);
    res.status(201).json({ message: 'Posted!' });

    //Catch Errors
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteCar = async (req,res,next)=>{
  try{    
    const deleteresponse =await CarReserve.delete(req.params.id);
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
