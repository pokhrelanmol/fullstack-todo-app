const express = require("express");
const router = express.Router();

const { changePasswordData } = require("../controllers/changePassword.js");
router.post("/", changePasswordData);

module.exports = router;
