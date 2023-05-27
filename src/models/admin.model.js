const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema({
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
  const token = jwt.sign({ _id: this._id }, "mynameismohammedamrath", {
    expiresIn: "15m",
  });
  this.tokens = this.tokens.concat({ token: token });
  await this.save();
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
