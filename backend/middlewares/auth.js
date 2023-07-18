const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const { UserModel } = require("../models/user.js");
require("dotenv").config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(422).json({ error: "Not Authorized" });
  }
  const token = authorization.replace("Bearer ", ""); // replace bearer and space and store the token in a variable
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Not Authorized" });
    }
    console.log("payload", payload);
    const { userId } = payload;
    UserModel.findById({ _id: userId }).then((userData) => {
      console.log("null", userData);
      if (userData) {
        console.log("userData", userData); // details of logged in user
        req.user = userData;
        next();
      }
    });
  });
};
