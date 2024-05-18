const UserDefine = require('../models/UserDefineSchema');

const createSchema = async (req, res) => {
    if (!req.body.name || !req.body.properties) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

    try {
        const schema = await UserDefine.create({
            ...req.body,
            project: req.params.id,
        });
        res.status(201).json({message: schema});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSchema = async (req, res) => {
    try {
        const schema = await UserDefine.find({ project: req.params.id });
        res.status(200).json({ message: schema });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSchemaName = async (req, res) => {
    try {
        const schema = await UserDefine.find({ project: req.params.id }, { name: 1 });
        res.status(200).json({ message: schema });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSchemaById = async (req, res) => {
    try {
        const schema = await UserDefine.findById(req.params.id);
        res.status(200).json({ message: schema });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSchema = async (req, res) => {
    console.log(req.body);
    if (!req.body) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }
 
    try {
        const schema = await UserDefine.findById(req.params.id);
        const data = {
            ...schema._doc,
            properties: req.body,
        }
        const resData = await UserDefine.updateOne({ _id: req.params.id }, data);
        res.status(200).json({ message: resData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createSchema,
    getSchema,
    getSchemaName,
    getSchemaById,
    updateSchema,
};