const { testsetsService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

const createTestsets = catchAsync(async(req, res) => {
    const result = await testsetsService.createTestsets(req.body);
    res.json(result);
});

const getTestsets = catchAsync(async(req, res) => {
    let allTestsets = await testsetsService.getTestsets();
    res.json(allTestsets);
});

const getTestsetById = catchAsync(async(req, res) => {
    const { id } = req.params;
    const testset = await testsetsService.getTestsetById(id);
    res.json(testset);
});
const deleteTestset = catchAsync(async(req, res) => {
    const { id } = req.params;
    const deletedTestset = await testsetsService.deleteTestset(id);
    res.json(deletedTestset);
});

module.exports = { createTestsets, getTestsets, getTestsetById, deleteTestset };