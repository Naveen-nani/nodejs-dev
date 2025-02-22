const express = require("express");

let app = new express(); // creatsing Instance


// all methods will call here like GET , POST, DELete, update
app.use('/user',(req,res) => {
    res.send('using use route')
})

app.get('/user',(req,res)=>{
    res.send({'name':'naveen Gande', 'age':25})
})

app.post('/user',(req,res)=>{
    res.send('data saved and updated in database')
})

app.delete('/user',(req,res)=>{
    res.send('data delated in data base')
})

app.patch('/user',(req,res)=>{
    res.send('data updated partially in database')
})

  app.use("/",(req, res)=> {
    res.send('hello naveen')
  });
  

app.listen('3000', ()=>{
    console.log('server is listening to port number 3000')
})