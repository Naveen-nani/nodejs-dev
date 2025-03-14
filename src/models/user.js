const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid Gender type");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/272-2720656_user-profile-dummy-hd-png-download.png",
    },
    about: {
        type: String,
        default:"Default message for the user"
    },
    skills: {
        type: [String]
    }
}, 
{
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

module.exports = User;