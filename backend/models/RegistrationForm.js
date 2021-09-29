const mongoose = require("mongoose");
const RegistrationForm = new mongoose.Schema(
  {
    FirstName: String,
    LastName: String,
    Email: String,
    MobileNumber: Number,
    Profession: String,
    Password: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.RegistrationForm ||
  mongoose.model("RegistrationDetails", RegistrationForm);
