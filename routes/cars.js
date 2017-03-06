const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Car = require('../models/car');

//Add car
router.post('/add', (req, res, next) => {
    let newCar = new Car({
        name: req.body.name,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        currentCar: req.body.currentCar,
        creationDate: Date.now(),
        mods: req.body.mods
    });

    Car.getCarByCarname(newCar.name, (err, car) => {
        if (err) throw err;
        if (car) {
            return res.json({ success: false, msg: 'Car name already taken' });
        } else {
            Car.addCar(newCar, (err, car) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to add car' });
                } else {
                    res.json({ success: true, msg: 'Car added' });
                }
            });
        }
    });
});

//get all cars
router.get('/all', (req, res, next) => {
    Car.getAllCars('', (err, cars) => {
        if (err) throw err;
        if (cars) {
            res.json({ success: true, cars: cars });
        } else {
            res.json({ success: false, cars: '' });
        }
    });
});


module.exports = router;