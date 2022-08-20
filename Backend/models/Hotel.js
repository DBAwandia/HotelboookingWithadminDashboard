const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    type:{
        type: String,
    },
    title:{
        type: String,
    },
    city:{
        type: String,
    },
    distance:{
        type: String,
    },
    photos:{
        type: [String]
    },
    desc:{
        type: String,
    },
    rating:{
        type: Number,
        min: 0,
        max: 8
    },
    rooms:{
        type: [String]
    },
    cheapestPrice:{
        type: Number,
    },
    featured:{
        type: Boolean,
        default: true
    }
})

const Hotel = mongoose.model("hotels", hotelSchema)
module.exports = Hotel