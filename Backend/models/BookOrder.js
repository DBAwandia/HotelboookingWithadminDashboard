const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    days:{
        type: Number
    },
    amount:{
        type: Number
    }
},
{timestamps: true})

const BookOrder = mongoose.model("bookorders", bookSchema)
module.exports = BookOrder