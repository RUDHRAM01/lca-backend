const Project = require('../models/Project');
const mongoose = require('mongoose');


const createProject = async (req, res) => {
    if (!req.body.name || !req.body.dbUrl) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

    try {
        const checkName = req.body.name.trim().toLowerCase();
        const projectExists = await Project.findOne({ name: { $regex: new RegExp(`^${checkName}$`, 'i') } });
        if (projectExists) {
            return res.status(400).json({ error: "Project with this name already exists" });
        }
        const connection = await mongoose.createConnection(req.body.dbUrl);
        connection.on('connected', async () => {
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
        const projects = await Project.find({admin : req.user.id})
        res.status(200).json({message : projects});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createProject,
    getAllProjects,
}

