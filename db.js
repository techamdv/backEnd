const mongoose = require("mongoose")
require('dotenv').config();
const mongoURI = process.env.mongoURI

const connectToMongo = async () =>{
    await mongoose.connect(mongoURI)
    console.log("connected to DB Successfully !! 👍👍👍👍👍👍👍👍👍👍👍👍👍👍🧐 ");
    }

module.exports =    connectToMongo