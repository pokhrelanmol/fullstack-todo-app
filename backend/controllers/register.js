const RegistrationForm = require("../models/RegistrationForm.js");
const bcrypt = require("bcryptjs");
const registeredData = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const encryptedData = { ...req.body, password: hash };
    const { firstname, lastname, email, password, mobilenumber, profession } =
      encryptedData;
    const formDetails = await RegistrationForm.create({
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      MobileNumber: mobilenumber,
      Profession: profession,
      Password: password,
    });
    console.log(formDetails);
    res.json(encryptedData).status(201);
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};
module.exports = { registeredData };
