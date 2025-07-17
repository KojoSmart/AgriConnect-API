const express = require("express");
const router = express.Router();

const {
  getBookingsForVendor,
  bookAEquipment,
  updateBookingStatus,
} = require("../controllers/bookingController");
const {
  authMiddlewareHandler,
  authorizedRoles,
} = require("../middleware/authMiddleware");

router.post(
  "/bookEquipment",
  authMiddlewareHandler,
  bookAEquipment
);

router.get(
  "/getBookingsForVendor",
  authMiddlewareHandler,
  authorizedRoles("admin"),
  getBookingsForVendor
);
router.patch("/updateBookingStatus/:id/status",authMiddlewareHandler,authorizedRoles("admin"), updateBookingStatus)

module.exports = router;
