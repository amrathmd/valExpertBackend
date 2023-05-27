const Company = require("../models/company.model");

const createCompany = async (companyBody) => {
  console.log(companyBody);
  const newcompany = new Company(companyBody);
  await newcompany.save();
  return {
    status: 201,
    message: "Company added succcessfully",
    newcompany,
  };
};

module.exports = {
  createCompany,
};
