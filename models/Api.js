const mongoose = require('mongoose');

const ApiSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    schema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDefine',
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