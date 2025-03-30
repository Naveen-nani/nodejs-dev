const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/sendConnect");
const  User = require("../models/user")

// Get all  pending connection Request from loggedIn User.
userRouter.get("/user/requests/received", userAuth, async (req, res) => {

    try {
        const logedInUser = req.user;

        const pendeningConnectionRequest = await ConnectionRequest.find({
            toUserId: logedInUser._id,
            status: 'intrested'
        }).populate("fromUserId", "firstName lastName age photoUrl about skills");
        // }).populate("fromUserId", ["firstName", "lastName", "age", "photoUrl", "about", "skills"]);


        res.json({ message: `Data fetched succesfully`, data: pendeningConnectionRequest })
    } catch (err) {
        res.status(400).send('Error : ', err.message);
    }
})

// viweing accepted connection request's
userRouter.get('/user/connections', userAuth, async (req,res) => {
    try{

        const loggedInUser = req.user;
        const accetedConnectionsRequests = await ConnectionRequest.find({
         $or :[
            {toUserId :loggedInUser._id, status: 'accepted'},
            {fromUserId :loggedInUser._id, status: 'accepted'}
         ]
        }).populate("fromUserId" , ["firstName", "lastName", "age", "photoUrl", "skills"])
          .populate("toUserId", ["firstName", "lastName", "age", "photoUrl", "skills"]);

          const data = accetedConnectionsRequests.map(row => {
            
             if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            } else {
                return row.fromUserId;
            }
          })
           
          res.send({message: `connection request view`, data});


    } catch (err) {
        res.status(400).send('Error :', err.message)
    }
})


userRouter.get("/feeds", userAuth,  async (req,res) => {
   

    try {

        const loggedInUser = req.user;

        //find all the conncetion request sended by user or recived by user.
        const connectionSentOrRecevied = await ConnectionRequest.find({
            $or : [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

       // hiding connection send or recived users

       const hideUsers = new Set();
       connectionSentOrRecevied.forEach((connect) => {
        hideUsers.add(connect.fromUserId.toString());
        hideUsers.add(connect.toUserId.toString());
       })


       //removing users and logged in user. same skilled users need to match.
        const user = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsers) } },
                { _id:  { $ne: loggedInUser._id }},
                { skills: {$in: loggedInUser.skills}}
            ]
        })

       console.log(user)

        res.json(user)

    } catch (err) {
        res.json({messagee : err.message})
    }
})

module.exports = userRouter;