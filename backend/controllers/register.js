const RegistrationForm = require("../models/RegistrationForm.js");
const bcrypt = require("bcryptjs");
const registeredData = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const encryptedData = { ...req.body, password: hash };
    const { name, email, password, mobilenumber, profession } = encryptedData;
    await RegistrationForm.create({
      name,
      email,
      mobilenumber,
      profession,
      password,
    });
    res.json(encryptedData).status(201);
  } catch (error) {
    if (error.code === 11000) {
      console.log("user exists in database");
      return res
        .json({ error: "username already exists in database" })
        .status(500);
    }
    console.log(error.message);
  }
};
module.exports = { registeredData };
