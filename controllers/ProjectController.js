const Project = require('../models/Project');
const mongoose = require('mongoose');
const { callingFunction } = require('../routes/Main');


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
            callingFunction();
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

const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({message : project});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createProject,
    getAllProjects,
    getProject
}

