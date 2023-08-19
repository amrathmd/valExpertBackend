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
    const { testscriptId } = req.params;
    const testscript = await testscriptsService.getTestscriptById(testscriptId);
    res.json(testscript);
});

const updateTestscript = catchAsync(async(req, res) => {
    const { testscriptId } = req.params;
    const updatedTestscript = await testscriptsService.updateTestscript(testscriptId, req.body);
    res.json(updatedTestscript);
});

const deleteTestscript = catchAsync(async(req, res) => {
    const { testscriptId } = req.params;
    const deletedTestscript = await testscriptsService.deleteTestscript(testscriptId);
    res.json(deletedTestscript);
});

const getTestscriptByTestSetId=catchAsync(async(req,res)=>{
    const {testscriptId}=req.params;
    const testscript = await testscriptsService.getTestscriptByTestSetId(testscriptId);
    res.json(testscript);
})

module.exports = { createTestscript, getTestscripts, getTestscriptById, updateTestscript, deleteTestscript,getTestscriptByTestSetId };