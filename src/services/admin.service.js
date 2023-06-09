const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");

const createAdmin = async (body) => {
  const existingUser = await Admin.findOne({ email: body.email });

  if (existingUser) {
    return {
      message: "User already exists",
      status: 409,
    };
  } else {
    body.userType = "valexpertadmin";
    const newAdmin = new Admin(body);
    await newAdmin.save();
    return {
      status: 201,
      message: newAdmin,
    };
  }
};
const deleteAdmin = async (id) => {
  const deleteResult = await Admin.deleteOne({ _id: id });
  if (deleteUser) {
    return {
      status: 200,
      message: deleteResult,
    };
  } else {
    return {
      message: "deletion unsuccessful",
      status: 404,
    };
  }
};
const checkLogin = async (body) => {
  const result = await Admin.findOne({ email: body.email });
  if (result !== null) {
    const passwordCheck = await bcrypt.compare(body.password, result.password);

    if (passwordCheck) {
      const token = await result.generateAuthToken();
      return {
        status: 201,
        message: {
          username: result.username,
          userType: result.userType,
        },
        token: token,
      };
    } else {
      return {
        message: "login unsuccessful",
        status: 401,
      };
    }
  } else {
    return {
      message: "User doesn't exist!",
      status: 401,
    };
  }
};

module.exports = {
  createAdmin,
  checkLogin,
  deleteAdmin,
};
