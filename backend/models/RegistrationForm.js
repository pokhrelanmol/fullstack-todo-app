const mongoose = require("mongoose");
const RegistrationForm = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    mobilenumber: Number,
    profession: String,
    password: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.RegistrationForm ||
  mongoose.model("RegistrationDetails", RegistrationForm);
