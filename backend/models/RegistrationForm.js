const mongoose = require("mongoose");
const RegistrationForm = new mongoose.Schema(
  {
    name: { type: "string", unique: true },
    email: String,
    mobilenumber: Number,
    profession: String,
    password: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.RegistrationForm ||
  mongoose.model("RegistrationDetails", RegistrationForm);
