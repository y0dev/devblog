const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const path = require("path");
require("dotenv").config({
  path: path.join(__dirname,"../../",".env")
});

const saltRounds = process.env.SALT_ROUNDS;

const register = (req, res) => {
    
    const newUser = new User({
        name: req.body.firstName + " " + req.body.lastName,
        username: req.body.username,
        email: req.body.email
    });
    
    if(req.body.password.length >= 8 ) {//|| !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(req.body.password)) {
        newUser.password = bcrypt.hashSync(req.body.password, saltRounds);
        User.exists({
            username: req.body.username,
            email: req.body.email 
        })
        .then(exist => {
            if(!exist) {
                newUser.save((err,user) => {
                    if (err) {
                        return res.status(400).json({
                            error: err,
                            message: "An error occured"
                        });
                    } else {
                        return res.status(200).json({
                            message: "User was created successfully"
                        });
                    }
                });
            } else {
                res.json({ message: 'User with email already exist!'});
            }
        });
    } else {
        return res.status(400).json({
            message: "Password must be at least 8 characters"
        });
    }
}

const login = (req, res) => {
    User.findOne({ $or :[
        {username:{ $regex : new RegExp(req.body.usernameEmail, "i") }}, // This is used to be case-insensitive
        {email: { $regex : new RegExp(req.body.usernameEmail, "i") }}]
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. No user found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password,user.password)) {
                res.status(401).json({ message: 'Authentication failed. Invalid Username/Password' });
            } else {
                let token = jwt.sign({username: user.username,name:user.name,email:user.email}, 'verySecretValue',{expiresIn: '1h'});
                return res.json({
                    message: "Login successful",
                    token
                });
            }
        }
    })
}

const signOut = (req,res) => {
    req.session.destroy(() => {
        res.send("logged Out");
    });
}

module.exports = {
    register,
    login,
    signOut
}
