const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let patientData = new Schema({
    Id: {
        type: String
    },
    Name: {
        type: String
    },
    OrderId:{
        type: String
    }
});

module.exports = mongoose.model('patientData', patientData);