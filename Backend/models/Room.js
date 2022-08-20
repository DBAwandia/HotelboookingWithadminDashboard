const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    price:{
        type: Number,
    },
    desc:{
        type: String,
    },
    maxPeople:{
        type: Number,
    },

    roomNumbers:[
        {
            number: Number,
            unavailableDates: {type: [Date]}
        }
                ]
       
    
},{timestamps: true})

const Room = mongoose.model("rooms", roomSchema)

module.exports = Room