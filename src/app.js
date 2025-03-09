const express = require("express");
const connectDB = require('./config/database');

let app = new express(); // creating Instance


// here we need to coonect DB first then we need to start the server.
connectDB().then(()=> {
    console.log('Database connect is scussess');
    app.listen('3000', () => {
        console.log('server is listening to port number 3000')
    })
}).catch((err) => {
    console.error('Databse cant be established');
})

