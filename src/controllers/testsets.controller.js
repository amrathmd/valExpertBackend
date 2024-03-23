

const { testsetsService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");

const createTestsets = catchAsync(async (req, res) => {
  try {
    console.log(req.body);
    const result = await testsetsService.createTestsets(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error creating test sets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getTestsets = catchAsync(async (req, res) => {
  try {
    let allTestsets = await testsetsService.getTestsets();
    res.json(allTestsets);
  } catch (error) {
    console.error('Error fetching test sets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getTestsetById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const testset = await testsetsService.getTestsetById(id);
    res.json(testset);
  } catch (error) {
    console.error('Error fetching test set by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const deleteTestset = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestset = await testsetsService.deleteTestset(id);
    res.json(deletedTestset);
  } catch (error) {
    console.error('Error deleting test set:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getTestSetsByProjectId = catchAsync(async (req, res) => {
  try {
    const { projectId } = req.params;
    const testsets = await testsetsService.getTestSetsByProjectId(projectId);
    res.json(testsets);
  } catch (error) {
    console.error('Error fetching test sets by Project ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {
  createTestsets,
  getTestsets,
  getTestsetById,
  deleteTestset,
  getTestSetsByProjectId,
};
