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

module.exports = { createTestsets, getTestsets };