const express = require("express");
const router = express.Router();

const {
  registerUser,
  registerAdmin,
  login,
} = require("../controllers/authController.js");

router.post("/registerUser", registerUser);
router.post("/registerAdmin", registerAdmin);
router.post("/login", login);

module.exports = router;
