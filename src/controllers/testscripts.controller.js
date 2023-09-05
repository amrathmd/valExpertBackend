const { testscriptsService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const createTestscript = catchAsync(async (req, res) => {
  const result = await testscriptsService.createTestscript(req.body);
  res.json(result);
});

const getTestscripts = catchAsync(async (req, res) => {
  const allTestscripts = await testscriptsService.getTestscripts();
  res.json(allTestscripts);
});

const getTestscriptById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const testscript = await testscriptsService.getTestscriptById(id);
  res.json(testscript);
});

const updateTestscript = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedTestscript = await testscriptsService.updateTestscript(
    id,
    req.body
  );
  res.json(updatedTestscript);
});


const deleteTestscript = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedTestscript = await testscriptsService.deleteTestscript(id);
  res.json(deletedTestscript);
});

const getTestscriptByTestSetId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const testscript = await testscriptsService.getTestscriptByTestSetId(id);
  res.json(testscript);
});

const getTestscriptsByRequirement = catchAsync(async (req, res) => {
  const { id} = req.params;
  const testscript = await testscriptsService.getTestscriptsByRequirement(id);
  res.json(testscript);
})


const getTestscriptsByProjectId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const testscript = await testscriptsService.getTestscriptsByProjectId(id);
  res.json(testscript);
})


const updateTestscriptRequirement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { requirements } = req.body;
  const updatedTestscripts = await testscriptsService.updateTestscriptRequirement(id, requirements );
  res.json(updatedTestscripts);
})
module.exports = {
  getTestscriptById,
  getTestscriptByTestSetId,
  deleteTestscript,
  updateTestscript,
  getTestscripts,
  createTestscript,
  getTestscriptsByRequirement,
  updateTestscriptRequirement,
  getTestscriptsByProjectId
};
