const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://naveennanigande422:4aFIe16KLvgqtU55@naveennode.hubw1.mongodb.net/');


const connectDB = async()=>{
    await mongoose.connect('connection string');
}

module.exports = connectDB;

