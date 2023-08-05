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
      validate: { 
        validator: function (value)
        {
          return /^[0-9]{10}$/.test(value); 
        },
        message: "Invalid mobile number",
      }
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
      required: true,
      trim: true,
      minlength: 8,
      private: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving it to the database
adminUsersSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Check if email is taken
adminUsersSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// Check if password matches the user's password
adminUsersSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  console.log("Stored Password:", user.password);
  console.log("Provided Password:", password);
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password Match:", isMatch);
  return isMatch;
};

const adminUser = mongoose.model("adminUser", adminUsersSchema);

module.exports = adminUser;
