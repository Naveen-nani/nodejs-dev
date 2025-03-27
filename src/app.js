const express = require("express");
const connectDB = require('./config/database');
const User = require('./models/user');
const { signUpDataValidation } = require('./utils/validators');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

const app = new express(); // creating Instance

//middileware to covernvert JSON to js object
app.use(express.json());
app.use(cookieParser()); // after installing npm pakage need to import for cookies ( npm i cookie-parser )

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// here we need to coonect DB first then we need to start the server.
connectDB().then(() => {
    console.log('Database connect is scussess');
    app.listen('7777', () => {
        console.log('server is listening to port number 7777')
    })
}).catch((err) => {
    console.error('Databse cant be established', err.message);
})

