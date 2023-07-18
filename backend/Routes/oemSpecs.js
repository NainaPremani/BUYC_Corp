const express = require("express");
const {
  getOEMCarModels,
  getAllOEMCars,
  FilterOEMcars,
} = require("../controllers/oemSpecs");
const app = express.Router();

// All cars Route
app.get("/", getAllOEMCars);

// Search cars by name Route
app.get("/search", FilterOEMcars);

// Get Available Cars model  Route
app.get("/carModels", getOEMCarModels);

module.exports = app;
