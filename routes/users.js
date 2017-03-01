const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mailconf = require('../config/mail');
const nodemailer = require('nodemailer');

const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: 'temp',
        creationDate: Date.now(),
        lastLogin: Date.now(),
        tmpPW: false
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

        if (!user.role) {
            User.updateRole(user, 'user', (err) => { if (err) throw err; });
        }

        User.comparePassword(password, user.password, (ess, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                User.updateLastLogin(user, (err) => { if (err) throw err; });
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
                        email: user.email,
                        tmpPW: user.tmpPW,
                        role: user.role
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

// get all users
router.get('/getall', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.getAllUsers('', (err, ausers) => {
        if (err) throw err;
        if (ausers) {
            var users = [];
            ausers.forEach(function(user) {
                var u = {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role: user.role
                };
                users.push(u);
            });

            console.log(users);
            res.json({
                success: true,
                users: users
            });
        } else {
            res.json({ success: false, users: '' });
        }
    });
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

// reset account
router.post('/resetpw', (req, res, next) => {
    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) throw err;
        if (user) {
            user.password = randID(10); //generate random values
            user.tmpPW = true;
            tmpPW = user.password;
            console.log(user.password);

            User.addUser(user, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed' });
                } else {

                    //Setup nodemailer
                    const transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: mailconf.mailuser,
                            pass: mailconf.mailpass
                        }
                    });
                    const mailOptions = {
                        from: mailconf.mailuser,
                        to: user.email,
                        subject: 'Temporary Password',
                        text: "Temp password: for " + user.username + ":" + tmpPW,
                        html: "<p>Temp Password for " + user.username + ": </p>" + tmpPW
                    };

                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log(error);
                            res.json({ success: false, msg: "FAIL" });
                        } else {
                            console.log('Message send: ' + info.response);
                            res.json({ success: true, msg: "SUCCESS" });
                        }
                    });
                }
            });
        } else {
            res.json({ success: false, msg: "FAIL" });
        }
    });
});

//update password
router.post('/updatepw', (req, res, next) => {
    console.log(req.body);
    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) throw err;
        if (user) {
            User.comparePassword(req.body.currentPW, user.password, (ess, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    user.password = req.body.newPW;
                    user.tmpPW = false;

                    User.addUser(user, (err, user) => {
                        if (user) {
                            res.json({ success: true, msg: 'Password updated' });
                        } else {
                            res.json({ success: false, msg: 'Error' });
                        }
                    });
                } else {
                    return res.json({ success: false, msg: 'Incorrect password' });
                }
            });

        } else {
            res.json({ success: false, msg: 'Error' });
        }
    });
});


// Get email
router.post('/getemail', (req, res, next) => {
    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) throw err;
        if (user) {
            res.json({ success: true, email: user.email });
        } else {
            res.json({ success: false, email: user.email });
        }
    });
});


function randID(length) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


module.exports = router;