const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
  images: {
    type: String,
    required: true,
  },
  Original_Paint: {
    type: String,
    required: true,
  },
  Number_of_accidents_reported: {
    type: Number,
    required: true,
  },
  Number_of_previous_buyers: {
    type: Number,
    required: true,
  },
  Registration_Place: {
    type: String,
    required: true,
  },
  KMs_on_Odometer: {
    type: Number,
    required: true,
  },
  Major_Scratches: {
    type: Number,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  car_Manufacturer: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const CarModel = mongoose.model("Marketplace_Inventory", CarSchema);

// Marketplace_Inventory is the name of table/schema where dealers can add their cars along with image and details

module.exports = { CarModel };
