const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderData = new Schema({
    Id: {
        type: String
    },
    Message: {
        type: String
    },
});

module.exports = mongoose.model('orderData', orderData);