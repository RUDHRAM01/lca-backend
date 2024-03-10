const mongoose = require('mongoose');

const ApiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    endpoint: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    }, 
});

const Api = mongoose.model('Api', ApiSchema);

module.exports = Api;