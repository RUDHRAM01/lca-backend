const mongoose = require("mongoose");
const UserDefine = require("../models/UserDefineSchema");

const createModal = async (api) => {
  const data = await UserDefine.find({
    project: api.project,
    name: api.schema.name,
  });

  const schema = {};
  data[0].properties.forEach((property) => {
    schema[property.pname] = {
      type: property.type,
      unique: property.isunique,
    };
  });
  const projectId = api.project.toHexString();
  const newSchema = new mongoose.Schema(schema);
  const modal = mongoose.model(api.schema.name + projectId, newSchema);
  return modal;
};

module.exports = createModal;
