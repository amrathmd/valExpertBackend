const express = require('express');
const { testscriptsController } = require('../../controllers');
const router = express.Router();

router.route('/')
    .post(testscriptsController.createTestscript)
    .get(testscriptsController.getTestscripts);
router.route('/:id')
    .get(testscriptsController.getTestscriptById)
    .put(testscriptsController.updateTestscript)
    .delete(testscriptsController.deleteTestscript)
    .patch(testscriptsController.updateRequirements);
router.route('/testset/:testsetId')
    .get(testscriptsController.getTestscriptByTestSetId);
router.route('/requirements/:requirementId')
    .get(testscriptsController.getTestscriptsByRequirement);
router.route('/update/:id')
    .get(testscriptsController.updateTestscriptRequirement);
router.route('/project/:projectId')
    .get(testscriptsController.getTestscriptsByProjectId);
module.exports = router;