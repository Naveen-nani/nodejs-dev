const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middleware/auth");

requestRouter.post('/sendConnectRequest',  async (req, res) => {
    // const user = req.user;

    console.log('connect request send');

    res.send('connection request send scussessfully');
})

module.exports = requestRouter;