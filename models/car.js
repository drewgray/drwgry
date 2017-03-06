const mongoose = require('mongoose');
const config = require('../config/database');

//User Schema
const CarSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    currentCar: {
        type: Boolean,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    images: [{
        path: String
    }],
    mods: [{
        description: String
    }]
});

const Car = module.exports = mongoose.model('Car', CarSchema);

module.exports.getCarById = function(id, callback) {
    Car.findById(id, callback);
}

module.exports.getCarByCarname = function(carname, callback) {
    const query = { name: carname }
    Car.findOne(query, callback);
}

module.exports.getAllCars = function(data, callback) {
    Car.find(callback);
}

module.exports.addCar = function(newCar, callback) {
    newCar.save(callback);
}

module.exports.deleteCar = function(id, callback) {
    Car.remove({ _id: id }, callback);
}