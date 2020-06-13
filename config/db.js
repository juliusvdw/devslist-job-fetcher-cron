const mongoose = require("mongoose");
const config = require("config");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(`${config.get("DBURI")}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("mongodb connected to devslist cluster...");
  } catch (err) {
    console.log(err.message);
  }
};
