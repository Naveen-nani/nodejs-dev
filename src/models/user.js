const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

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
        validate(value){
            if(!validator.isEmail(value)){  //isEmail is from npm validator package
                throw new Error("Enter a valid email address");
            }
        }
    },
    password: {
        type: String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is not strong enough");
            }
        }
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
        validate(value){
            if(!validator.isURL(value)){   //isURL is from npm validator package
                throw new Error("Enter a valid URL");
            }
        }
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
});

userSchema.methods.getJWT =  async function(){
  const user = this;
  const token = await jwt.sign({_id:user._id}, "Naveen@5", {expiresIn: "7d"});
    return token;
}

userSchema.methods.validatePassword = async function (passwordEnterByUser){
    const user = this;
    const hashPassword = user.password;

    const isPasswordValid = await bcrypt.compare(passwordEnterByUser, hashPassword);
    return isPasswordValid;
}

const User = mongoose.model('User', userSchema);

module.exports = User;