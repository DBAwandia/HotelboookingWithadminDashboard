const mongoose = require("mongoose")

const deliverySchema = new mongoose.Schema({
    name:{
        type: String
    },
    city:{
        type: String
    }
    ,
    photos:{
        type: [String]
    },
    phonenumber:{
        type: Number
    }
})

const Delivery = mongoose.model("delivery",deliverySchema )

module.exports = Delivery