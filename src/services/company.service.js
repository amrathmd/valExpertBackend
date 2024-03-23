const Company = require("../models/company.model");

const createCompany = async (companyBody) => {
  console.log("company bpdy...........",companyBody);
  const newcompany = new Company(companyBody);
  console.log("new company in servuce..........",newcompany)
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
