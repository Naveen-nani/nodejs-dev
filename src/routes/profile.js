const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const {validateEditProfileData} = require("../utils/validators");
const User = require("../models/user");
const bcrypt = require("bcrypt");

profileRouter.get('/profiles/view', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);

    } catch (err) {
        res.status(500).send('Error: ' + err.message)
    }

});

profileRouter.patch('/profile/edit', userAuth, async (req,res) => {

    try {
        if (!validateEditProfileData(req)) {
            throw new error('Invalid profile edit data');
        }

        const loggedInUser = req.user;


        Object.keys(req.body).forEach((field) => {
            loggedInUser[field] = req.body[field];
        });
        await loggedInUser.save();
        res.json({ status: `${loggedInUser.firstName} profile updated scussessfully`, data: loggedInUser });
    } catch (err) {
        res.status(500).send('Error: ' + err.message)
    }

})

profileRouter.patch('/profile/password',  userAuth, async (req,res) => {
    // check valid user or not 
    // ask to enter old password 
    // compare with new that password with DB password
    // ask to enter new password hash it and save it in DB;


    try {
        
    const { password, newPassword} = req.body;
    const user = req.user;

    const isPasswordMatched  = await user.validatePassword(password);
    //  const isPasswordMatched = await bcrypt.compare(password, user.password);

     if(isPasswordMatched){
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        await user.save();
     } else {
         throw new Error('Old password is not matched');
     }

    res.send('password updated scussessfully');
    } catch (err) {
        res.status(500).send('Error: ' + err.message)
    }
})
    


module.exports = profileRouter;