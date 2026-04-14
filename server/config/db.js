const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = ()  => {

    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongo database is connected successfully");
    })
    .catch((err) => {
        console.log(err);


        console.log("Database is not connected ");

    })
}