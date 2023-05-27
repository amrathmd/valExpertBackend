const express = require("express");
const router = express.Router();
const { authController } = require("../../controllers/index");

router.route("/loggedIn").get(authController.checkLoggedIn);
router.route("/logout").get(authController.logOut);

module.exports = router;
