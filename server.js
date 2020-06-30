const express = require("express");

const app = express();

//Import  workers and config
const connectDB = require("./config/db");
const getJobsCron = require("./workers/getJobsCron");

//connect to mongo db
connectDB();

//Call getJobsCron that fetches jobs every two hours
getJobsCron.start();

app.listen(5000, console.log("server has started on port 5000"));
