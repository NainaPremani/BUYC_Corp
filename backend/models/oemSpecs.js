const mongoose = require("mongoose");

const oemSchema = mongoose.Schema({
  car_manufacturers: {
    type: String,
    required: true,
  },
  name_of_model: {
    type: String,
    required: true,
  },
  year_of_model: {
    type: Number,
    required: true,
  },
  price_of_new_vehicle: {
    type: Number,
    required: true,
  },
  available_color: [
    {
      type: String,
    },
  ],
  mileage: {
    type: Number,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
  max_speed: {
    type: Number,
    required: true,
  },
});

const Oem_model = mongoose.model("Oem", oemSchema);
// here Oem is the name of collection which will hold all the data acoording to specification of company

module.exports = { Oem_model };
