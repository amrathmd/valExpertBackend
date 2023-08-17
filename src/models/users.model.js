const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const adminUsersSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid email address",
      },
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
    },
    group: [
      {
        type: String,
        required: true,
      },
    ],
    country: {
      type: String,
      required: true,
    },
    office: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);



// Check if email is taken
adminUsersSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// Check if password matches the user's password
adminUsersSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

const adminUser = mongoose.model("adminUser", adminUsersSchema);

module.exports = adminUser;
