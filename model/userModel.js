const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,

    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
   type: String,
   required: true
    },

    phoneNumber:{
        type: Number,
        required: true
    },
    
    region:{
    type: String,
    required: true
    },
    role:{
        type: String,
        default:"user"
    },
    location: {
        type: String
    },

    // Only for Admin
   companyName: { type: String },
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)