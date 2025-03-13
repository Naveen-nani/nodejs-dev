const express = require("express");
const connectDB = require('./config/database');
const User = require('./models/user')

const app = new express(); // creating Instance

//middileware to covernvert JSON to js object
app.use(express.json());

app.post('/signup', async (req, res) => {
    // signup with Dynamic data (postman).
    // creating new Instance of the model
    const user = new User(req.body);


    // to handile errors we need to keep our code into try and catch block && all of the (most of the) mongoose functions are promises so we nned to use async N await.
    try {
        await user.save();
        res.send('user created scuccessfully in to database');
    } catch (err) {
        // res.status(500).send('data not saved into server', err.message);
        res.send(500, 'data not saved into server', err.message)
        // res.status(500).send(err.message);
    }

})
// here we need to coonect DB first then we need to start the server.
connectDB().then(() => {
    console.log('Database connect is scussess');
    app.listen('7777', () => {
        console.log('server is listening to port number 7777')
    })
}).catch((err) => {
    console.error('Databse cant be established', err.message);
})

