const express = require("express");
const router = express.Router();

const { registeredData } = require("../controllers/register.js");
router.post("/", registeredData);

module.exports = router;
