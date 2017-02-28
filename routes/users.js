const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });


    User.getUserByUsername(newUser.username, (err, user) => {
        if (err) throw err;
        if (user) {
            return res.json({ success: false, msg: 'User name already taken' });
        } else {
            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to register user' });
                } else {
                    res.json({ success: true, msg: 'User registered' });
                }
            });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePassword(password, user.password, (ess, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //1 week in seconds
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Incorrect password' });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

// Username taken
router.post('/exists', (req, res, next) => {
    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) throw err;
        if (user) {
            res.json({ success: false, msg: 'User name already taken' });
        } else {
            res.json({ success: true, msg: 'User name available' });
        }
    });
});

module.exports = router;