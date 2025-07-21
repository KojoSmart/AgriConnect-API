const { equal } = require("joi");
const Booking = require("../model/bookingModel");
const Equipment = require("../model/equipmentModel");
const User = require("../model/userModel");
const sendEmail = require("../utils/bookingSendEmail");

//  User or farmer books an advert
const bookAEquipment = async (req, res) => {
  try {
    const { equipId, requestedDate } = req.body;
    const equip = await Equipment.findById(equipId).populate("owner");
    if (!equip) {
      res.status(404).json({ message: "Equipment not found" });
    }
    const booking = await Booking.create({
      equipment: equipId,
      user: req.user.id,
      requestedDate,
    });

    await sendEmail({
      to: equip.owner.email,
      subject: `New Booking Request for ${equip.name}`,
      html: `
    <p>You have a new booking request for <strong>${equip.name}</strong> on <strong>${requestedDate}</strong>.</p>
  `,
    });
    res
      .status(201)
      .json({ success: true, message: "Booking request sent", booking });
  } catch (error) {
    res
      .status(400)
      .json({
        msuccess: false,
        message: "Booking failed",
        error: error.message,
      });
  }
};

//  Vendor gets all bookings for their equipment

const getBookingsForVendor = async (req, res) => {
  try {
    const ads = await Equipment.find({ owner: req.user.id }).select("_id");
    const equipIds = ads.map((ad) => ad._id);

    const bookings = await Booking.find({ equipment: { $in: equipIds } })
      .populate("equipment")
      .populate("user", "fullName email");
    if (!bookings) {
      return res.status(404).json({
        success: false,
        message: "No booking found",
        items: [],
      });
    }
    res.json(bookings);
  } catch (error) {
    res
      .status(400)
      .json({
        succeess: false,
        message: "Could not load bookings",
        error: error.message,
      });
  }
};

// vendor update booking
const updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;

    // Validate status
    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findById(bookingId)
      .populate("equipment")
      .populate("user");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only allow vendor to update booking for their own ad
    if (booking.equipment.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this booking" });
    }

    // Update and save booking status
    booking.status = status;
    await booking.save();

    // Notify the user via email
    await sendEmail({
      to: booking.user.email,
      subject: `Booking ${status.toUpperCase()}`,
      html: `
        <p>Hello ${booking.user.fullName},</p>
        <p>Your booking for <strong>${booking.equipment.name}</strong> on <strong>${booking.requestedDate}</strong> has been <strong>${status}</strong>.</p>
      `,
    });

    res
      .status(200)
      .json({ success: true, message: `Booking ${status}`, booking });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Failed to update booking",
        error: error.message,
      });
  }
};



module.exports = {
  getBookingsForVendor,
  bookAEquipment,
  updateBookingStatus,
};
