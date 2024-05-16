const Projects = require("../models/Project");
const Api = require("../models/Api");
const Users = require("../models/User");
const express = require("express");
const mainRouter = express.Router();
const createModal = require("../utils/CreateDynamicModal");
const returnData = require("../utils/ReturnData");


const callingFunction = async () => {
    const allUsers = await Users.find();
    if (allUsers) {
      allUsers.forEach(async (user) => {
        const allProjectAssociatedWithUser = await Projects.find({
          admin: user._id,
        });
        if (allProjectAssociatedWithUser) {
          allProjectAssociatedWithUser.forEach((project) => {
            const id = project._id.toHexString();
            mainRouter.get(`/${project.name}/${id}`, (req, res) => {
              console.log("Hello World!", project.name);
              res.status(200).send("working fine " + `${project.name}`);
            });
          });
        }
      });
    }
  };

callingFunction();

const mainRouterRoutes = async () => {
    const allApis = await Api.find().populate('schema');
    if (allApis) {
      allApis.forEach(async (api) => {
        const project = await Projects.findById(api.project);
        const id = project._id;
        if(api.method === 'GET') {
          mainRouter.get(`/${project.name}/${id}/${api.endpoint}`, async (req, res) => {
            const modal = await createModal(api)
            // const data = await modal.find();
            const data = 'data'
            res.status(200).json(data);
          });
        } else if(api.method === 'POST') {
          mainRouter.post(`/${project.name}/${id}/${api.endpoint}`,async (req, res) => {
            res.status(200).send("working fine " + `${project.name}`);
          });
        } else if(api.method === 'PUT') {
          mainRouter.put(`/${project.name}/${id}/${api.endpoint}`,async (req, res) => {
            res.status(200).send("working fine " + `${project.name}`);
          });
        } else if(api.method === 'DELETE') {
          mainRouter.delete(`/${project.name}/${id}/${api.endpoint}`,async (req, res) => {
            res.status(200).send("working fine " + `${project.name}`);
          });
        }
      });
    }
  };

mainRouterRoutes();

module.exports = {
    mainRouter,
    callingFunction
}