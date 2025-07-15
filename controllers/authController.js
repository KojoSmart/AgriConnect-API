const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { urlencoded } = require("express");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { fullName, username, email, password, phoneNumber, region, location, role } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      region,
      location,
      role: "farmer",
    });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    console.error("Error in register function:", error); // this logs the error
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const registerAdmin = async (req, res) => {
  const {
    fullName,
    username,
    email,
    password,
    phoneNumber,
    role,
    region,
    location,
    companyName
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      region,
      role: "admin",
      companyName,
      location
    });

    await newUser.save();
    res.status(201).json({ 
      message: "Admin registered successfully" ,
     newUser
  });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      token: token,
      user: {
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        location: user.location,
        companyName: user.companyName,
        fullName: user.fullName
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  registerAdmin,
  login,
};
