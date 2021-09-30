const RegistrationForm = require("../models/RegistrationForm.js");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const loginData = async (req, res) => {
  try {
    const { name, password } = await req.body;
    const user = await RegistrationForm.findOne({
      name,
    }).lean();
    const checkPasword = await bcrypt.compare(password, user.password);
    if (checkPasword) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET_KEY
      );
      return res.json({ status: "ok", userToken: token });
    } else {
      return res
        .status(400)
        .json({ status: "error", error: "invalid username or password " });
    }
  } catch (err) {
    console.log("cannot get the user");
    res
      .status(404)
      .json({ status: "error", error: "sorry you are not registered" });
  }
};
module.exports = { loginData };
