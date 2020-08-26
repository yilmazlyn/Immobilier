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

    password: {
        type: String,
        required: true
    }, 

    date: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
}); 

module.exports = User = mongoose.model("users", UserSchema); 

