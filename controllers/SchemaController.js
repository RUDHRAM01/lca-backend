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



module.exports = {
    createSchema,
    getSchema
};