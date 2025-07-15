const mongoose = require("mongoose")


const bookingSchema = new mongoose.Schema({

    equipment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    requestedDate: Date,
    status: String, // "pending", "accepted", "declined"

    createdAt: Date


}, {timestamps: true})

module.exports = mongoose.model("Booking", bookingSchema)