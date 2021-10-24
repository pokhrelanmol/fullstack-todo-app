const RegistrationForm = require("../models/RegistrationForm.js");
const bcrypt = require("bcryptjs");
const registeredData = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const encryptedData = { ...req.body, password: hash };
    const { name, email, password, mobilenumber, profession } = encryptedData;
    await RegistrationForm.create({
      username: name,
      email,
      mobilenumber,
      profession,
      password,
    });
    console.log("user registered");
    res.json(encryptedData).status(201);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "user already exists please try another username" });
    }
    console.log(error);
    res.status(500).json({ error: "we are sorry server is not responding" });
  }
};
module.exports = { registeredData };
