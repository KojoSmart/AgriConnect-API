const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    vendor :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },

    image:{
        public_id : String,
        url: String
    },
    price:{
        type: Number,
        required: true
    },
    phoneNumber:{
        type: Number
    },
    community:{
        type: String
    },
    cropName:{
        type: String
    }
    
})

module.exports = mongoose.model("product", productSchema )