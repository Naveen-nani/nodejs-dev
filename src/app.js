const express = require("express");

let app = new express(); // creatsing Instance


// app.get("/",(req, res)=> {
//   res.send('hello naveen')
// });

app.get("/firstPage",(req, res)=> {
    res.send('First page')
  })

  app.get("/secoundPage",(req, res)=> {
    res.send('secound Page')
  })

app.listen('3000', ()=>{
    console.log('server is listening to port number 3000')
})