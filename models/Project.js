const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dbUrl: {
        type: String,
        required: true,
    },
    dbtype: {
        type: String,
        default: 'mongodb',
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},{
    timestamps: true,
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;