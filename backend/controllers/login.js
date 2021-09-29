const RegistrationForm = require("../models/RegistrationForm.js");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const loginData = async (req, res) => {
  const { name, password } = req.body;

  const user = await RegistrationForm.findOne({
    name,
  }).lean();

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET_KEY
    );
    return res.json({ status: "ok", data: token });
  }
  res.json({ error: "Invalid  username or password", status: "error" });
};
module.exports = { loginData };
