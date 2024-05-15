const Projects = require("../models/Project");
const Users = require("../models/User");
const express = require("express");
const mainRouter = express.Router();


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

module.exports = {
    mainRouter,
    callingFunction
}