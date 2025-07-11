const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    owner :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    name:{
        type: String,
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
    // location:{
    //     type: String
    // },
    description:{
  type: String
    },
    
    isAvailable:{
        type: Boolean
    },

    createdAt: Date
    
}, {timestamps: true})

module.exports = mongoose.model("Equipment", productSchema )