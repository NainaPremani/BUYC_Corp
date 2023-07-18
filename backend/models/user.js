const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Password"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "please provide a unique email"],
    unique: true,
  },

  mobile: {
    type: Number,
    required: [true, "Please provide a Mobile Number"],
  },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
