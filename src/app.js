const express = require("express");

let app = new express(); // creatsing Instance

// syntax for route handiler
// app.get('',[(rh1),(rh2),(rh3)]) we can keep all route handilters in array


app.get('/user',[(req,res,next) => {
    console.log('first Route handiler');
    next();
    res.send('I am first route handiler');
},(req,res,next) => {
    console.log('2 nd route handiler');
    res.send('I am 2nd  route handiler')
    next();
},(req,res,next) => {
    console.log('3 nd route handiler');
    res.send('I am 3nd  route handiler');
    next();
}]
),

  

app.listen('3000', ()=>{
    console.log('server is listening to port number 3000')
})