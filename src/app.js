const express = require("express");
const connectDB = require('./config/database');
const User = require('./models/user')

const app = new express(); // creating Instance


app.post('/signup', async (req,res)=> {
  
    const userObj = {
            firstName:'test1',
            lastName:'John1',
            email:'john1@gmail.com',
            password: 'john1@123'
        }

        const user = new User(userObj)

// to handile errors we need to keep our code into try and catch block && all of the (most of the) mongoose functions are promises so we nned to use async N await.
    try{
        await user.save();
        res.send('user created scuccessfully in to database');
    } catch(err) {
        res.status(500).send('data not saved into server', err.message)
    }
    
})
// here we need to coonect DB first then we need to start the server.
connectDB().then(()=> {
    console.log('Database connect is scussess');
    app.listen('7777', () => {
        console.log('server is listening to port number 7777')
    })
}).catch((err) => {
    console.error('Databse cant be established', err.message);
})

