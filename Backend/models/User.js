const mongoose = require("mongoose")
const validator = require("validator")


const userSchema = new mongoose.Schema({
    username:{
        type: String,
   
        maxlength: 20,
        
       
    },
    email:{
        type: String,
        validator:{
            validate: validator.isEmail,
            message: " Input right email"
        },
    },
    password:{
        type: String,
        minlength: 4,
    },
    img:{
        type: String
    },
    orders:{
        type:[String]
    },
    phonenumber:{
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},
    {timestamps: true},
)

const User = mongoose.model("users", userSchema)
module.exports = User