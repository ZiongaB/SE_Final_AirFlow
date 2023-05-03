const {validationResult} = require('express-validator');
const User = require('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res,next) =>{
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) return
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try{ 
        const hashedPassword = await bcrypt.hash(password,12);

        const userDetails = {
            name:name,
            email:email,
            password: hashedPassword
        }
        
        const result = await User.save(userDetails)

        res.status(201).json({ message: 'User registered'})
    } catch(err){
        if (!err.statusCode){
            console.log("error!");
            err.statusCode = 500;
        } 
        next(err)
    }
};

exports.login = async (req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;
    try{    
        const user = await User.find(email);
        
        if (user[0].length !==1){
            const error = new Error('A user with this email could not be found.')
            error.statusCose = 401;
            throw error;
        }
        
        const storedUser = user[0][0];
        const isEqual = await bcrypt.compare(password, storedUser.Password);

        if(!isEqual){
            const error = new Error('Wrong password')
            error.statusCose = 401;
            throw error;
        }
        const token = jwt.sign({
            email:storedUser.Email,
            userId:storedUser.ID
        }, 'secretfortoken',
        {expiresIn:'2h'});
        
        res.status(200).json({token:token, userId:storedUser.ID});

    }catch(err){
    if (!err.statusCode){
        console.log("error!");
        err.statusCode = 500;
    }
    next(err)
}
}

exports.budget = async (req,res,next) =>{
    const email = req.body.name;
    const budget = req.body.budget

    try{    
        const userDetails = {
<<<<<<< Updated upstream
            email:email,
            password: budget
=======
            id:id,
            budget: budget
>>>>>>> Stashed changes
        }

        //console.log(userDetails);
        
        const result  = await User.budget(userDetails);
        res.status(200).json("Budget Updated");

    }catch(err){
        if (!err.statusCode){
            console.log("error!");
            err.statusCode = 500;
        }
        next(err)
    }
}


//Export fetchAll to be used
exports.fetchBudget = async (req, res, next) => {
    const ID =req.params.id;
    
    try {
        const allPosts = await User.fetchBudget(ID);
        //console.log(allPosts[0]);
        res.status(200).json(allPosts[0]);
    } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
};