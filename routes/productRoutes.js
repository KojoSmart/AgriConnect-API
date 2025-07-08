const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadFileMiddleware")

const createProduct = require("../controllers/createProductController");
const authMiddlewareHandler = require("../middleware/authMiddleware");



router.post("/farmerCreate", authMiddlewareHandler, upload.single("image"), createProduct);


module.exports = router