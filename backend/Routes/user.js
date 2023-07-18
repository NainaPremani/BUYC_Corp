const express = require("express");
const app = express.Router();
const { userSignup, userLogin } = require("../controllers/userController");

// User register Route
app.post("/register", userSignup);

// User Log in Route
app.post("/login", userLogin);

module.exports = app;
