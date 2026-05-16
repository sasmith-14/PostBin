const mongoose = require('mongoose');

async function connectDB() {

    await mongoose.connect("mongodb+srv://suvarnasasmith14_db_user:TX50QXMxpJWWc2I6@cluster0.cpnxg0q.mongodb.net/postbin");
    console.log("connected to database");

}

module.exports = connectDB;