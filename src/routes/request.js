const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const  ConnectionRequest  = require("../models/sendConnect");
const User = require("../models/user");



requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    
     try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ['intrested', 'ignored'];

        if(!allowedStatus.includes(status)){
               return res.status(400).send(`Invalid  ${status} status`)
        }

        const toUser = await User.findById(toUserId);
        if(!toUser) return res.status(400).send('User not found');

        const existingConnectionResquest = await ConnectionRequest.findOne({
                $or:[
                        {fromUserId, toUserId}, 
                        {fromUserId: toUserId, toUserId: fromUserId}
                ]
        });

        console.log('existingConnectionResquest123', existingConnectionResquest)

        if(existingConnectionResquest){
               return res.status(400).send('connection request already send');
        }

        // this function is handile with Pre in Schema. it works like middile ware.
//       if(ConnectionRequest.fromUserId === ConnectionRequest.toUserId){
//                 return res.status(400).send('You cannot send connection request to yourself');
//       }

        const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status
        })
        const data = await connectionRequest.save();
      

        res.json({message : `connection request send succesfully`, data });

     } catch (err) {
             res.status(404).send('Error :' + err.message);
     }
})

module.exports = requestRouter;