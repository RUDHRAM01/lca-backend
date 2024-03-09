const Project = require('../models/Project');
const mongoose = require('mongoose');


const createProject = async (req, res) => {
    if (!req.body.name || !req.body.dbUrl) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

    try {
        const connection = await mongoose.createConnection(req.body.dbUrl);
        connection.on('connected', async () => {
            console.log('Connected to database');
            const project = await Project.create({
                ...req.body,
                admin: req.user.id
            });
            res.status(201).json({message:  project});
        });

        connection.on('error', (err) => {
            return res.status(500).json({ error: "Failed to establish connection to the database" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findById(req.user.id);
        res.status(200).json({message : projects});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createProject,
    getAllProjects,
}

