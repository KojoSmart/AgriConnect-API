const User = require("../model/userModel");
const mongoose = require("mongoose");
const Product = require("../model/productModel");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs/promises");
const productCreate = require("../utils/productValidate");

const createProduct = async (req, res) => {
  const { price, phoneNumber, cropName, community } = req.body;

  try {
    const { error, value } = productCreate.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    console.log(req.file);

    const savedProduct = await Product.create({
      price: value.price,
      phoneNumber: value.phoneNumber,
      cropName: value.cropName,
      community: value.community,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },

      vendor: req.user.id,
    });
    res.status(201).json({ success: true, savedProduct });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = createProduct;
