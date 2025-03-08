const express = require("express");

let app = new express(); // creating Instance

let { adminAuth, userAuth } = require('./middleware/auth')

app.get("/admin1", (req, res) => {


    try {
        throw new Error('anckokrmk');
        res.send('hello admin');
    } catch (err) {
        res.status(500).send('please contaict systeam adminter');
    }
}
)

// middile ware that handile error we need to keep this line end of the all functions
app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send('please contact sysyteam admin');
    }
})

app.listen('3000', () => {
    console.log('server is listening to port number 3000')
})