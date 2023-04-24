const express = require('express');

const { body } = require('express-validator');

const eventController = require ('../controllers/checklist');

const auth =  require('../middleware/auth');

const router = express.Router();

router.get('/', auth, eventController.fetchAll);

router.post(
    '/',
    [
      auth,
      body('user').trim().isLength({ min: 1 }).not().isEmpty(),
      body('description').trim().isLength({ min: 1 }).not().isEmpty(),
      body('tripname').trim().isLength({ min: 1 }).not().isEmpty(),
    ],
    eventController.postChecklist
);

module.exports = router;