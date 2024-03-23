const { companyController } = require("../../controllers/index");
const express = require("express");
const router = express.Router();

router.route("/").post(companyController.createCompany);

module.exports = router;
