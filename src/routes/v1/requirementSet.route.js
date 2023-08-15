const express = require("express");
const { requirementSetController } = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .post(requirementSetController.createRequirementSet)
  .get(requirementSetController.getRequirementSets);

router
  .route("/:id")
  .get(requirementSetController.getRequirementSetById)
  .delete(requirementSetController.deleteRequirementSet);
router
  .route("/project/:projectId")
  .get(requirementSetController.getRequirementSetByProjectId);

module.exports = router;
