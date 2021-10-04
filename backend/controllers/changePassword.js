const RegistrationForm = require("../models/RegistrationForm.js");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const changePasswordData = async (req, res) => {
  try {
    const { oldpassword, newpassword } = await req.body;
    const token = req.headers["x-access-token"];
    //     decode from token

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const _id = decoded.id;
    const user = await RegistrationForm.findOne({
      _id,
    }).lean();
    console.log(user);
    const checkPassword = await bcrypt.compare(oldpassword, user.password);
    if (checkPassword) {
      const encryptNewPassword = await bcrypt.hash(newpassword, 10);
      const found = await RegistrationForm.findOneAndUpdate(
        { _id },
        { $set: { password: encryptNewPassword } },
        { new: true }
      );
      console.log(found);
      console.log("password updated");
      return res.json({ status: "ok", message: "password updated" });
    } else {
      return res
        .status(400)
        .json({ status: "error", error: "invalid old password " });
    }
  } catch (err) {
    res
      .status(404)
      .json({ status: "error", error: "something went wrong try again " });
  }
};
module.exports = { changePasswordData };
