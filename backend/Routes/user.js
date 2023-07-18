const express = require("express");
const bcrypt = require("bcrypt");

const { UserModel } = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const UserRoute = express.Router();

// Register a user

UserRoute.post("/signup", async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    // check for existing email
    const existemail = new Promise(async (resolve, reject) => {
      let alreadyexistemail = await UserModel.findOne({ email });
      if (alreadyexistemail) {
        reject({ error: "The email id already exist" });
      } else {
        resolve();
      }
    });

    const existmobile = new Promise(async (resolve, reject) => {
      let alreadyexistmobile = await UserModel.findOne({ mobile });
      if (alreadyexistmobile) {
        reject({ error: "The mobile number id already exist" });
      } else {
        resolve();
      }
    });

    Promise.all([existemail, existmobile])
      .then(() => {
        if (password) {
          bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
              return res.status(500).send({ err });
            } else {
              const user = new UserModel({
                name,
                email,
                password: hash,
                mobile,
              });
              await user.save();
              res.status(201).send({ msg: "User Register Successfully !" });
            }
          });
        }
      })
      .catch((err) => {
        console.log("wrong");
        return res.status(500).send({ err: err });
      });
  } catch (err) {
    return res.status(501).send({ error: err });
  }
});

// login user
UserRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).send({ err: "email Not Found..!" });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        // comapiring hashed password
        if (result) {
          const { _id, name, email } = user;
          // create jwt token

          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
          return res.status(200).send({
            msg: "Login Successfull...!",
            user: { _id, name, email },
            token: token,
          });
        } else {
          return res.status(404).send({ err: "Incorrect Password" });
        }
      });
    }
  } catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = { UserRoute };
