const {validationResult} = require('express-validator');
const User = require('../models/user');
const Leaderboard = require('../models/leaderboard');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res,next) =>{
    const errors = validationResult(req);

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
        const leadDetails = {
            username:name,
            classAdd:0, 
            dormChoice:0,
            hamVisit:0,
            facilVis:0,
            faculCheck:0
        }
        const addresult = await Leaderboard.save(leadDetails)
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
            userId:storedUser.id
        }, 'secretfortoken',
        {expiresIn:'2h'});
        
        res.status(200).json({token:token, userId:storedUser.id});

    }catch(err){
    if (!err.statusCode){
        console.log("error!");
        err.statusCode = 500;
    }
    next(err)
}

    
}