const jwt = require('jsonwebtoken');
const User = require("../models/user");

const userAuth = async (req,res, next)=> {
    try {
        const cookies = req.cookies;
        const {token} = cookies;

        if(!token){
            throw new Error('Token not found');
        }

        const decodedMessage = await jwt.verify(token, "Naveen@5");

        const user = await User.findById(decodedMessage._id);
        if(!user){
            throw new Error('User not found');
        }
        req.user = user;
        next();


    }catch(err){
        res.status(400).send('Error: ' + err.message);
    }
}

module.exports = { userAuth }