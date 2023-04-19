/**
 * This is the controller file that defines the how backend functions are
 * called to save and retrieve data relating to the calendar 
 * @author Zach East
 */

const { validationResult } = require('express-validator');
const CalendarItem = require('../models/calendarItem');


//Export fetchAll to be used
exports.fetchAll = async (req, res, next) => {
  
  const user = req.body.user;

  //Call fetchAll function
  try {
    const [allPosts] = await CalendarItem.fetchAll(user);
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
exports.postEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return;

  //Set constants to variable data
  const user = req.body.user;
  const event = req.body.event;
  const start = req.body.start;
  const end = req.body.end;

  //Create a post object using variables
  try {
    const post = {
      user: user,
      event: event,
      start: start,
      end: end,
    };

    //Call save function
    const result = await CalendarItem.save(post);
    res.status(201).json({ message: 'Posted!' });

    //Catch Errors
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};