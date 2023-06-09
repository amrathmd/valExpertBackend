const jwt = require("jsonwebtoken");
const { jwtsecretkey } = require("../config/config");
const Admin = require("../models/admin.model");

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
const findUserType = async (req, res) => {
  const token = req.cookies.Authtokenvalexpert;

  if (!token) {
    res.send(null);
  } else {
    const token1 = jwt.decode(token, jwtsecretkey);

    const expDate = token1.exp;
    const currDate = Math.floor(new Date() / 1000);
    if (currDate < expDate) {
      try {
        const admin = await Admin.findOne({
          tokens: { $elemMatch: { token } },
        });
        if (admin) {
          const userType = admin.userType;
          const username = admin.username;
          res.send({ userType, username });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      res.send(null);
    }
  }
};

module.exports = {
  checkLoggedIn,
  logOut,
  findUserType,
};
