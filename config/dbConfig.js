const mongoose = require("mongoose")
require("dotenv").config();

const connecDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")

    } catch (error) {
     console.log(error.message)
    process.exit(1)
    }
}

module.exports = connecDB;
