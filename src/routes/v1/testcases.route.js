const express = require('express');
const { testcasesController } = require('../../controllers');
const Testcase = require("../../models/testcases.model");
const router = express.Router();

router.route('/')
    .post(testcasesController.createTestcases)
    .get(testcasesController.getTestcases);
router.route('/:id')
    .get(testcasesController.getTestcaseById)
    .put(testcasesController.updateTestcase)
    .delete(testcasesController.deleteTestcase);

module.exports = router;