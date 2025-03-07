const express = require("express");

let app = new express(); // creatsing Instance

let {adminAuth, userAuth} = require('./middleware/auth')

//handiling route handilers Indivisually.

//the function which send responce back is called request handiler
// remaing are middlewares

//middileware authorization  for Admin and get data

app.use('/admin',adminAuth)

app.get('/admin/getAllData',(req,res)=> {
    res.send('Admin authorized successfully and get data')
})

//middileware authorization  for user to get data 
app.get('/user/data', userAuth,(req,res)=> {
    res.send('user authorized and get data');
});


//middileware authorization not implemented  for user to login
app.get('/user/login',(req,res)=> {
    res.send('user loggined');
})






  

app.listen('3000', ()=>{
    console.log('server is listening to port number 3000')
})