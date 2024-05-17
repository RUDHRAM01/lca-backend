const mongoose = require("mongoose");
const UserDefine = require("../models/UserDefineSchema");

const createModal = async (api) => {
  try {
    // Fetch the schema definition from the UserDefine collection
    const data = await UserDefine.find({
      project: api.project,
      name: api.schema.name,
    });

    // If no schema definition is found, throw an error
    if (data.length === 0) {
      throw new Error("Schema definition not found");
    }

    // Construct the Mongoose schema object from the fetched schema definition
    const schemaDefinition = {};
    data[0].properties.forEach((property) => {
      schemaDefinition[property.pname] = {
        type: property.type,
        unique: property.isunique,
      };
    });

    // Generate a unique model name using the schema name and project ID
    const projectId = api.project.toHexString();
    const modelName = `${api.schema.name}${projectId}`;

    // Check if the model already exists
    if (mongoose.models[modelName]) {
      return mongoose.models[modelName];
    }

    // Create the Mongoose schema and model
    const newSchema = new mongoose.Schema(schemaDefinition);
    const modal = mongoose.model(modelName, newSchema);

    return modal;
  } catch (error) {
    console.error("Error creating modal:", error);
    throw error;
  }
};

module.exports = createModal;
