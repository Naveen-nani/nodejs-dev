const express = require("express");
const connectDB = require('./config/database');
const User = require('./models/user');
const { signUpDataValidation } = require('./utils/validators');
const bcrypt = require('bcrypt');

const app = new express(); // creating Instance

//middileware to covernvert JSON to js object
app.use(express.json());


app.post('/signup', async (req, res) => {




    // to handile errors we need to keep our code into try and catch block && all of the (most of the) mongoose functions are promises so we nned to use async N await.
    try {
        //validations for signup data
        signUpDataValidation(req);

        //validations for encript password
        const { firstName, lastName, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);

        // signup with Dynamic data (postman).
        // creating new Instance of the model
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        await user.save();
        res.send('user created scuccessfully in to database');
    } catch (err) {
        res.status(500).send('data not saved into server' + err.message);

    }
})

//GET API calls

app.get('/user', async (req, res) => {
    const userEmail = req.body.email;

    try {
        const user = await User.findOne({ email: userEmail });
        console.log('user', user);
        if (user.length === 0) {
            res.status(400).send('user not found');
        } else {
            res.send(user);
        }
    } catch (err) {
        res.send(500, 'something went wrong', err.message)
    }

})

app.get('/feeds', async (req, res) => {


    try {
        const usersData = await User.find({});
        if (usersData.length === 0) {
            res.status(400).send('user not found');
        } else {
            res.send(usersData);
        }

    } catch (err) {
        res.send(500, 'something went wrong', err.message)
    }
})

// get user By Id

app.get('/userById', async (req, res) => {
    const userId = req.body.id;

    try {
        const getUserById = await User.findById(userId);

        if (getUserById.length === 0) {
            res.status(400).send('user not found');
        } else {
            res.send(getUserById);
        }

    } catch (err) {
        res.send(500, 'something went wrong', err.message)
    }
})

//Delete user ById

app.delete('/deleteUser', async (req, res) => {
    const userId = req.body.id;

    try {
        const deleteUser = await User.findByIdAndDelete(userId);
        res.send('user Deleted sucess fully')
    } catch (err) {
        res.send(500, 'something went wrong', err.message);
    }
})

//update user ById

app.patch('/updateUserData/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const updateData = req.body;


    try {

        const allowedUpdate = ["age", "skills", "gender", "photoUrl"];
        const isValidOperation = Object.keys(updateData).every((k) => allowedUpdate.includes(k));

        if (!isValidOperation) {
            throw new Error('Invalid updates');
        }
        if (updateData.skills.length > 5) {
            throw new Error("skills should be less than 5");
        }
        const updateUser = await User.findByIdAndUpdate(userId, updateData, { returnDocument: 'after', runValidators: true });
        console.log('updateUser', updateUser);
        res.send('user updated sucessfully');
    } catch (err) {
        res.send(500, 'something went wrong' + err.message);
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

