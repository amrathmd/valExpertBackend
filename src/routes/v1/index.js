const express = require("express");
const userRoute = require("./user.route");
const adminRoute = require("./admin.route");
const companyRoute = require("./company.route");
const config = require("../../config/config");
const authRoute = require("./auth.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/company",
    route: companyRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
