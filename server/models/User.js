const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: {
        type: String, min:2, max:25, 
        required: true, 
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
        trim: 3, 
    },

    emailToken: {
        type: String
    },

    password: {
        type: String,
        required: true
    }, 

    date: {
        type: Date,
        default: Date.now
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    resetLink: {
        type: String,
        default: " "
    }


}); 

module.exports = User = mongoose.model("users", UserSchema); 

