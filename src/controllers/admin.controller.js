const adminServices = require("../services/admin.service");
const bcrypt = require("bcrypt");
const config = require('../config/config')

const createAdmin = async (req, res) => {
  const encrptPassword = await bcrypt.hash(req.body.password, saltRounds);
  const adminBody = {
    companyId: req.body.companyId,
    username: req.body.username,
    password: encrptPassword,
    email: req.body.email,
  };
  try {
    const result = await adminServices.createAdmin(adminBody);
    console.log(result);
    res.status(result.status).send(result.message);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal sever error" });
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await adminServices.deleteUser(id);
    return result;
  } catch (err) {
    res.status(500).send({ message: "Internal server Error" });
  }
};
const loginAdmin = async (req, res) => {
  try {
    const result = await adminServices.checkLogin(req.body);
    if (result.status === 201) {
      res.cookie("Authtokenvalexpert", result.token, {
        httpOnly: true,
      });
    }
    return res.status(result.status).send(result);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Some internal server error occured,Try again!" });
  }
};

module.exports = {
  createAdmin,
  deleteUser,
  loginAdmin,
};
