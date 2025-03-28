const express = require("express");
const authRouter = express.Router();

const { signUpDataValidation} = require("../utils/validators");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");



authRouter.post('/signup', async (req, res) => {

    // to handile errors we need to keep our code into try and catch block && all of the (most of the) mongoose functions are promises so we nned to use async N await.
    try {
        //validations for signup data
        signUpDataValidation(req);

        //validations for encript password
        const { firstName, lastName, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);

        // signup with Dynamic data (postman).
        // creating new Instance of the model
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        await user.save();
        res.send('user created scuccessfully in to database');
    } catch (err) {
        res.status(500).send('data not saved into server' + err.message);

    }
})


authRouter.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!validator.isEmail(email)) {
            throw new Error('Enter a valid email address');
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error('Invalide creditials');
        }

        // const isMatchPassword = await bcrypt.compare(password, user.password);
        const isMatchPassword = await user.validatePassword(password);

        if (isMatchPassword) {
            //create a jwt token

            //  const token = await jwt.sign({_id:user._id}, "Naveen@5", {expiresIn: "7d"}); // first one is hide data, secound one is secrate data.
            const token = await user.getJWT();   // above line is code refactored;  

            res.cookie('token', token);
            res.send('Loged in Scussessfully')

        } else {
            throw new Error('Invalide Creditials');
        }
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
})

authRouter.post('/logout', async (req,res) => {
    res.cookie('token', null, {expires: new Date(Date.now())});
    res.send('Logout scussessfully');
})


module.exports = authRouter;
