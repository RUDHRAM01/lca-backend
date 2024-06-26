const Api = require('../models/Api');
const Project = require('../models/Project');
const { mainRouterRoutes } = require('../routes/Main');


const createApi = async (req, res) => {
    if(!req.params.id) return res.status(400).json({ error: 'Project ID is required' });
    if(!req.body.name) return res.status(400).json({ error: 'API name is required' });
    if(!req.body.schema) return res.status(400).json({ error: 'Schema is required' });
    if(!req.body.endpoint) return res.status(400).json({ error: 'Endpoint is required' });
    if(!req.body.method) return res.status(400).json({ error: 'Method is required' });
    if(req.body.endpoint.indexOf(' ') !== -1) return res.status(400).json({ error: 'Endpoint should not contain spaces' });

    const findProject = await Project.findById(req.params.id);
    if(!findProject) return res.status(404).json({ error: 'Project not found' });

    try {
        const api = await Api.create({
            ...req.body,
            project: req.params.id
        });
        mainRouterRoutes();
        res.status(201).json({ api });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getApi = async (req, res) => {
    try {
        const api = await Api.find({ project: req.params.id});
        res.status(200).json({ message: api });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteApi = async (req, res) => {
    try {
        const find = await Api.findById(req.params.id);
        const project = await Project.findById(find.project);
        if (project.admin.toHexString() !== req.user.id) {
          return res.status(403).json({ error: "Access denied" });
        }
        const api = await Api.findByIdAndDelete(req.params.id);
        if(!api) return res.status(404).json({ error: 'API not found' });
        mainRouterRoutes();
        res.status(200).json({ message: 'API deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    createApi,
    getApi,
    deleteApi
};