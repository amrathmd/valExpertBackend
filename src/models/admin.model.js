const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtsecretkey } = require("../config/config");
const { string } = require("joi");

const adminSchema = mongoose.Schema({
  companyId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

adminSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, jwtsecretkey, {
    expiresIn: "15m",
  });
  this.tokens = this.tokens.concat({ token: token });
  await this.save();
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
