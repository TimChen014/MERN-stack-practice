const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const orderDataRoutes = express.Router();
const patientDataRoutes = express.Router();
const PORT = 4000;

let orderData = require('./orderData.model');
let patientData = require('./patientData.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/patientData', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});

// get patientsData and ordersData

orderDataRoutes.route('/orders').get(function (req, res) {
    orderData.find(function (err, orders) {
        if (err) {
            console.log(err);
        } else {
            res.json(orders);
        }
    });
});

patientDataRoutes.route('/patients').get(function (req, res) {
    patientData.find(function (err, patients) {
        if (err) {
            console.log(err);
        } else {
            res.json(patients);
        }
    });
});

orderDataRoutes.route('/orders').post(function (req, res) {
    let order = new orderData(req.body);
    console.log(order);
    order.save()
        .then(order => {
            res.status(200).send({ 'order': 'order added successfully' });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

patientDataRoutes.route('/patients').post(function (req, res) {
    let patient = new patientData(req.body);
    console.log(patient);
    patient.save()
        .then(patient => {
            res.status(200).send({ 'patient': 'patient added successfully' });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// update ordersData

orderDataRoutes.route('/orders').put(function (req, res) {
    if (!orderData) {
        res.status(404).send('data is not found');
        res.send(err);
    } else {
        orderData.findOneAndUpdate({ "Id": req.body.Id }, {
            "$set": {
                "Message": req.body.Message
            }
        })
            .then(() => {
                orderData.find(function (err, orders) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(orders);
                    };
                });
            });
    };
});

app.use('/juboProject', orderDataRoutes);
app.use('/juboProject', patientDataRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});