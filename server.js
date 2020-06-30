const express = require("express");

const app = express();

//Import  workers and config
const connectDB = require("./config/db");
const getJobsCron = require("./workers/getJobsCron");

//connect to mongo db
connectDB();

//Call getJobsCron that fetches jobs every two hours
getJobsCron.start();

//Declare PORT var. Default to 5000 if no env PORT is found
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server has started on port 5000"));
