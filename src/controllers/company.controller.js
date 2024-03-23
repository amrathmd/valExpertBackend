const companyServices = require("../services/company.service");

const createCompany = async (req, res) => {
  try {
    const company = await companyServices.createCompany(req.body);
    if (company) {
      res.status(201).send(company);
    } else {
      res.status(409).send(company);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  createCompany,
};
