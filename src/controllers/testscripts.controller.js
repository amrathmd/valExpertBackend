const { testscriptsService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createTestscript = catchAsync(async(req, res) => {
    const result = await testscriptsService.createTestscript(req.body);
    res.json(result);
})

const getTestscripts = catchAsync(async(req, res) => {
    const allTestscripts = await testscriptsService.getTestscripts();
    res.json(allTestscripts);
});

const getTestscriptById = catchAsync(async(req, res) => {
    const { id } = req.params;
    const testscript = await testscriptsService.getTestscriptById(id);
    res.json(testscript);
});

const updateTestscript = catchAsync(async(req, res) => {
    const { id } = req.params;
    const updatedTestscript = await testscriptsService.updateTestscript(id, req.body);
    res.json(updatedTestscript);
});

const deleteTestscript = catchAsync(async(req, res) => {
    const { id } = req.params;
    const deletedTestscript = await testscriptsService.deleteTestscript(id);
    res.json(deletedTestscript);
});

const getTestscriptByTestSetId=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const testscript = await testscriptsService.getTestscriptByTestSetId(id);
    res.json(testscript);
})

module.exports = { createTestscript, getTestscripts, getTestscriptById, updateTestscript, deleteTestscript,getTestscriptByTestSetId };