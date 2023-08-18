const { confObjectsService } = require("../services");
const catchAsync = require("../utils/catchAsync");


const createConfObjects = catchAsync(async (req, res) => {
  try {
    console.log("Creating confObjects...");
    const confData = req.body;
    const newConf = await confObjectsService.createConfObjects(confData);
    res.status(201).json({ newConf });
  } catch (error) {
    console.error("Error creating confObjects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


const getConfObjects = catchAsync(async(req, res,) => {
  const allconfObjects = await confObjectsService.getConfObjects();
  res.status(200).json({ allconfObjects });
});

const getConfObjectsById = async (req, res) => {
  const objectId = req.params.id;
  try {
      const confObject = await confObjectsService.getConfObjectById(objectId);
      return res.status(200).json(confObject);
  } catch (error) {
      return res.status(500).json({ message: 'Error retrieving confObject', error: error.message });
  }
};


const updateConfObject = catchAsync(async (req, res) => {
  const confObjectId = req.params.id;
  const updateData = req.body;
  const updatedConfObject = await confObjectsService.updateConfObject(confObjectId, updateData);
  if (!updatedConfObject) {
    return res.status(404).json({ error: 'Configurable object not found' });
  }
  res.json({ updatedConfObject });
});

const deleteConfObject = catchAsync(async (req, res) => {
  const confObjectId = req.params.id;
  const deletedConfObject = await confObjectsService.deleteConfObject(confObjectId);
  if (!deletedConfObject) {
    return res.status(404).json({ error: 'Configurable object not found' });
  }
  res.status(204).end();
});

const deleteAllConfObjects = catchAsync(async (req, res) => {
  await confObjectsService.deleteAllConfObjects();
  res.status(204).end();
});

module.exports={
    createConfObjects,
    getConfObjects,
    getConfObjectsById,
    updateConfObject,
    deleteConfObject,
    deleteAllConfObjects
};