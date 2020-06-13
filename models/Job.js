const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, index: true },
  description: { type: String, unique: true },
  company: { type: String },
  date: Date,
  link: String,
  categories: { type: Array, index: true },
  id: String,
  source: String,
});

module.exports = mongoose.model("Job", JobSchema);
