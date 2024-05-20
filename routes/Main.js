const Projects = require("../models/Project");
const Api = require("../models/Api");
const Users = require("../models/User");
const express = require("express");
const mainRouter = express.Router();
const createModal = require("../utils/CreateDynamicModal");
const UserDefine = require("../models/UserDefineSchema");

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
  const allApis = await Api.find().populate("schema");
  if (allApis) {
    allApis.forEach(async (api) => {
      const project = await Projects.findById(api.project);
      const projectId = project._id;
      if (api.method === "GET") {
        mainRouter.get(
          `/${project.name}/${projectId}/${api.endpoint}`,
          async (req, res) => {
            const modal = await createModal(api);
            const data = await modal.find();
            res.status(200).json(data);
          }
        );
      } else if (api.method === "POST") {
        mainRouter.post(
          `/${project.name}/${projectId}/${api.endpoint}`,
          async (req, res) => {
            const modal = await createModal(api);
            const data = await UserDefine.find({
              project: api.project,
              name: api.schema.name,
            });
            const obj = {};
            let required = "";
            data[0].properties.forEach((property) => {
              if (property.isrequired && !req.body[property.pname]) {
                required = property.pname;
                return;
              } else {
                if (req.body[property.pname]) {
                  obj[property.pname] = req.body[property.pname];
                }
              }
            });
            if (required) {
              return res.status(400).send(`${required} is required`);
            }
            if (Object.keys(obj).length === 0) {
              return res.status(400).send("cannot create empty object");
            }else{
              const result = await modal.create(obj);
              res.status(200).json(result);
            } 
          }
        );
      } else if (api.method === "PUT") {
        mainRouter.put(
          `/${project.name}/${projectId}/${api.endpoint}/:id`,
          async (req, res) => {
            const { id } = req.params;
            if (!id) {
              return res.status(400).send("id is required");
            }
            const modal = await createModal(api);
            const data = await UserDefine.find({
              project: api.project,
              name: api.schema.name,
            });
            const obj = {};
            data[0].properties.forEach((property) => {
              if (req.body[property.pname]) {
                obj[property.pname] = req.body[property.pname];
              }
            });
            if (Object.keys(obj).length === 0) {
              return res.status(400).send("cannot update empty object");
            }
            try {
              const findValue = await modal.findById({ _id: id });
              if (!findValue) {
                return res.status(400).send("id not found");
              }
              const finalObj = { ...findValue._doc, ...obj };
              const result = await modal.findByIdAndUpdate(
                { _id: id },
                finalObj,
                { new: true }
              );
              res.status(200).send(result);
            } catch (err) {
              res.status(400).send({ message: "error occured" });
            }
          }
        );
      } else if (api.method === "DELETE") {
        mainRouter.delete(
          `/${project.name}/${projectId}/${api.endpoint}/:id`,
          async (req, res) => {
            const { id } = req.params;
            if (!id) {
              return res.status(400).send("id is required");
            }
            const modal = await createModal(api);
            try {
              const result = await modal.findByIdAndDelete({ _id: id });
              res.status(200).send(result);
            } catch (err) {
              res.status(400).send({ message: "error occured" });
            }
          }
        );
      }
    });
  }
};

mainRouterRoutes();

module.exports = {
  mainRouter,
  callingFunction,
  mainRouterRoutes,
};
