const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  adminId: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  Address: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  contact: {
    phone: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
    },
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
