/**
 * This is the controller file that defines the how backend functions are
 * called to save and retrieve data relating to the calendar 
 * @author Zach East
 */
const { validationResult } = require('express-validator');

const CalendarItem = require('../models/calendarItem');

exports.fetchAll(user) = async (req, res, next) => {
  try {
    const [allPosts] = await CalendarItem.fetchAll(user);
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postEvent = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;
  
  const user = req.body.user;
  const event = req.body.event;
  const start = req.body.start;
  const end = req.body.end;

  try {
    const post = {
      user: user,
      event: event,
      start: start,
      end: end,
    };
    const result = await CalendarItem.save(post);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};