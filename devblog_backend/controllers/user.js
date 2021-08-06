const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const loginRequired = (req, res, next) => {
    if (req.session.authenticated) {
        console.log('Logged In!!!');
        //next();
    } else {
         console.log('Logged Out!!!');
         res.status(401).json({ message: 'Unauthorized user!' })
    }
}

const register = (req, res) => {
    const newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, saltRounds);
    User.exists({email: req.body.email })
    .then(exist => {
        if(!exist) {
            newUser.save((err,user) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    });
                } else {
                    user.password = undefined;
                    req.session.authenticated = true;
                    req.session.user = {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        id: user._id,
                    };
                    res.locals.user = user;
                    return res.json(req.session);
                }
            });
        } else {
            res.json({ message: 'User with email already exist!'});
        }
    });
}

const login = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. No user found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password,user.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password' });
            } else {
                user.password = undefined;
                req.session.authenticated = true;
                req.session.user = {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    id: user._id,
                };
                res.locals.user = user;
                return res.json(req.session);
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
    loginRequired,
    register,
    login,
    signOut
}
