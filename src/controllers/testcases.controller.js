const { testcasesService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createTestcases = catchAsync(async(req, res) => {
    const result = await testcasesService.createTestcases(req.body);
    res.json(result);
})

const getTestcases = catchAsync(async(req, res) => {
    const allTestcases = await testcasesService.getTestcases();
    res.json(allTestcases);
});

const getTestcaseById = catchAsync(async(req, res) => {
    const { id } = req.params;
    const testcase = await testcasesService.getTestcaseById(id);
    res.json(testcase);
});

const updateTestcase = catchAsync(async(req, res) => {
    const { id } = req.params;
    const updatedTestcase = await testcasesService.updateTestcase(id, req.body);
    res.json(updatedTestcase);
});

const deleteTestcase = catchAsync(async(req, res) => {
    const { id } = req.params;
    const deletedTestcase = await testcasesService.deleteTestcase(id);
    res.json(deletedTestcase);
});

const getTestcasesByTestSetId=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const testCases=await testcasesService.getTestcasesByTestSetId(id);
    res.json(testCases);
})

module.exports = { createTestcases, getTestcases, getTestcaseById, updateTestcase, deleteTestcase,getTestcasesByTestSetId };