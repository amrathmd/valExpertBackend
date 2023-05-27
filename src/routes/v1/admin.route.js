const express = require("express");
const router = express.Router();
const { adminController } = require("../../controllers/index");

router.route("/").post(adminController.createAdmin);
router.route("/:id").delete(adminController.deleteAdmin);
router.route("/login").post(adminController.loginAdmin);

module.exports = router;
