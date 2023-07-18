const mongoose = require("mongoose");

const oemSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    year: { type: Number, required: true },
    list_price: { type: String, required: true },
    available_colors: [String],
    mileage: { type: String, required: true },
    power: { type: Number, required: true },
    max_speed: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

const oemModel = mongoose.model("oem_spec", oemSchema);

module.exports = oemModel;
