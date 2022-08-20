const mongoose = require ('mongoose')

const orderSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    
    province:{
        type: String,
        required: true
    },
        
    areas:{
        type: String,
        required: true
    },    
    town:{
        type: String,
        required: true
    },
},
{timestamps: true},
)

const Order = mongoose.model("orders",orderSchema )
module.exports = Order