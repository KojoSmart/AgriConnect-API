

const express = require("express");
const router = express.Router();

const{getBookingsForVendor, bookAEquipment} = require("../controllers/bookingController");
const { authMiddlewareHandler, authorizedRoles } = require("../middleware/authMiddleware");



router.post("/bookEquipment", authMiddlewareHandler, bookAEquipment);

router.get("/getBookingsForVendor", authMiddlewareHandler,authorizedRoles("admin"), getBookingsForVendor);

module.exports = router;