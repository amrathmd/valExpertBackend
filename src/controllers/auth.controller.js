const jwt = require("jsonwebtoken");
const { jwtsecretkey } = require("../config/config");

const checkLoggedIn = async (req, res) => {
  const token = req.cookies.Authtokenvalexpert;

  try {
    if (!token) {
      res.json(false);
    } else {
      jwt.verify(token, jwtsecretkey);
      res.json(true);
    }
  } catch (error) {
    res.json(false);
  }
};
const logOut = async (req, res) => {
  res
    .cookie("Authtokenvalexpert", "", {
      expires: new Date(0),
      httpOnly: true,
    })
    .send();
};

module.exports = {
  checkLoggedIn,
  logOut,
};
