const { teststepsService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

const createTeststep = catchAsync(async(req, res) => {
    const result = await teststepsService.createTeststep(req.body);
    res.json(result);
});

const getTeststeps = catchAsync(async(req, res) => {
    let allTeststeps = await teststepsService.getTeststeps();
    res.json(allTeststeps);
});

const getTeststepById = catchAsync(async(req, res) => {
    const { id } = req.params;
    const teststep = await teststepsService.getTeststepById(id);
    res.json(teststep);
});
const deleteTeststep = catchAsync(async(req, res) => {
    const { id } = req.params;
    const deletedTeststep = await teststepsService.deleteTeststep(id);
    res.json(deletedTeststep);
});

module.exports = { createTeststep, getTeststeps, getTeststepById, deleteTeststep };