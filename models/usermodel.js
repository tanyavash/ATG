const mongoose = require("mongoose");
const userschema = mongoose.Schema({

    username: {
        type: String,
        required: [true, "add username"],
    
    },

    email: {
        type: String,
        required: [true, "add emailid"],
        unique: [true, "it should be unique"]
    },

    password: {
        type: String,
        required: [true, "add user password"]
    },
},
{
    timestamps: true,
}

);

module.exports = mongoose.model("User", userschema);