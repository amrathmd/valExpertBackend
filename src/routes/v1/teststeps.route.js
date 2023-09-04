const express = require('express');
const { teststepsController } = require('../../controllers');
const router = express.Router();


router
    .route('/')
    .post(teststepsController.createTeststep)
    .get(teststepsController.getTeststeps);
router.route('/:id')
    .get(teststepsController.getTeststepById)
    .delete(teststepsController.deleteTeststep);
router.route('/testcases/:testscriptId')
    .get(teststepsController.getTestStepsByTestcaseId);

router.route('requirements/:requirementId')
    .get(teststepsController.getTeststepsByRequirement);

router.route('/update/:id')
    .get(teststepsController.updateTeststepRequirement);
module.exports = router;