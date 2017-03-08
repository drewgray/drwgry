const mongoose = require('mongoose');
const config = require('../config/database');
var datastore = require('@google-cloud/datastore')({
    projectId: config.GCLOUD_PROJECT,
    keyFilename: config.keyfile
});

//Car Schema
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
    var key = datastore.key(['Car']);
    var nCar = [{
            name: 'name',
            value: newCar.name
        },
        {
            name: 'make',
            value: newCar.make
        },
        {
            name: 'model',
            value: newCar.model
        },
        {
            name: 'year',
            value: newCar.year
        },
        {
            name: 'currentCar',
            value: false
        },
        {
            name: 'creationDate',
            value: newCar.creationDate
        }
    ];
    datastore.save({
        key: key,
        data: nCar
    }, function(err) {
        const query = datastore.createQuery('Car');
        datastore.runQuery(query)
            .then((results) => {
                const cars = results[0];
                console.log(car);
                //cars.forEach((car) => console.log(car));
            });
    });
    newCar.save(callback);
}

module.exports.deleteCar = function(id, callback) {
    Car.remove({ _id: id }, callback);
}