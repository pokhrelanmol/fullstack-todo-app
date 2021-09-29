const express = require("express");
const router = express.Router();

const { loginData } = require("../controllers/login.js");
router.post("/", loginData);

module.exports = router;
