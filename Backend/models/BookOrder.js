const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    days:{
        type: Number
    },
    amount:{
        type: Number
    },
    dayone:{
        type: String
    },
    daytwo:{
        type: String
    },
    name:{
        type: String
    }
},
{timestamps: true})

const BookOrder = mongoose.model("bookorders", bookSchema)
module.exports = BookOrder