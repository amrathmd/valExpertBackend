const confObject = require('../models/confObjects.model'); 

async function createConfObjects(confData) {
  try {
    const newConf = await confObject.create(confData);
    return newConf;
  } catch (error) {
    throw new Error("Error creating configurable object");
  }
}

async function getConfObjects() {
  try {
    const allconfObjects = await confObject.find();
    return allconfObjects;
  } catch (error) {
    throw new Error('Error while fetching configurable objects');
  }
}

async function getConfObjectById(confObjectId) {
  const foundConfObject = await confObject.findById(confObjectId);
  if (!foundConfObject) {
      throw new Error("Configurable object not found");
  }
  return foundConfObject;
}

async function updateConfObject(confObjectId, updateData) {
  try {
    const updatedObject = await confObject.findByIdAndUpdate(
      confObjectId,
      updateData,
      { new: true }
    );
    return updatedObject; 
  } catch (error) {
    throw { statusCode: 500, message: "Error updating configurable object." };
  }
}

async function deleteConfObject(confObjectId) {
  try {
    const deletedObject = await confObject.findByIdAndDelete(confObjectId);
    if (!deletedObject) {
      return null; 
    }
    return deletedObject;
  } catch (error) {
    throw new Error('Error deleting configurable object.');
  }
}
async function deleteAllConfObjects() {
  try {
    await confObject.deleteMany();
  } catch (error) {
    throw { statusCode: 500, message: "Error deleting configurable objects." };
  }
}

module.exports = {
  createConfObjects,
  getConfObjects,
  getConfObjectById,
  updateConfObject,
  deleteConfObject,
  deleteAllConfObjects
};