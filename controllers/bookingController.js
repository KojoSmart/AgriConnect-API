const Booking = require("../model/bookingModel");
const Equipment= require("../model/equipmentModel");
const User = require('../model/userModel')

//  User or farmer books an advert
const bookAEquipment = async (req, res) => {
  try {
    const { equipId, date } = req.body;

    const booking = await Booking.create({
      equip: equipId,
      user: req.user.id,
      date,
    });

    res.status(201).json({ message: "Booking request sent", booking });
  } catch (error) {
    res.status(400).json({ message: "Booking failed", error: error.message });
  }
};

//  Vendor gets all bookings for their equipment

const getBookingsForVendor = async (req, res) => {
  try {
    const ads = await Equipment.find({ owner: req.user.id }).select("_id");
    const equipIds = ads.map(ad => ad._id);

    const bookings = await Booking.find({ equipment: { $in: equipIds } })
      .populate("equipment")
      .populate("user", "name email");

    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: "Could not load bookings" });
  }
};

module.exports={
    getBookingsForVendor,
    bookAEquipment
}

