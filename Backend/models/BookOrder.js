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
    rommname:{
        type: String
    },
    daytwo:{
        type: String
    },
    name:{
        type: String
    },
    hotelname:{
        type: String
    }
    ,
    phonnumbers:{
        type: Number
    }
},
{timestamps: true})

const BookOrder = mongoose.model("bookorders", bookSchema)
module.exports = BookOrder