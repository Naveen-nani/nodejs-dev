const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/sendConnect")

// Get all  pending connection Request from loggedIn User.
userRouter.get("/user/requests/received", userAuth, async (req, res) => {

    try {
        const logedInUser = req.user;

        const pendeningConnectionRequest = await ConnectionRequest.find({
            toUserId: logedInUser._id,
            status : 'intrested'
        // }).populate("fromUserId", ["firstName", "lastName"]);
    }).populate("fromUserId", "firstName, lastName, age, photoUrl, about, skills");

       console.log("pendeningConnectionRequest", pendeningConnectionRequest);
    res.json({message : `Data fetched succesfully`, data: pendeningConnectionRequest})
    } catch (err) {
        res.status(400).send('Error : ', err.message);
    }
})

module.exports = userRouter;