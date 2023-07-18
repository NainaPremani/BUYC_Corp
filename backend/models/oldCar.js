const mongoose = require("mongoose");

const oldCarsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    manufacturer: { type: String, required: true },
    title: { type: String, required: true },
    odometerDistance: { type: String, required: true },
    totalAccident: { type: Number, required: true },
    color: { type: String, required: true },
    totalBuyers: { type: Number, required: true },
    registrationPlace: { type: String, required: true },
    price: { type: String, required: true },
    mileage: { type: String, required: true },
    img: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const oldCarsModel = mongoose.model("oldCar", oldCarsSchema);

module.exports = oldCarsModel;
