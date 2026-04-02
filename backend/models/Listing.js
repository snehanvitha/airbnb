const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  image: String,
  description: String,
  user: String   // 🔥 ADD THIS LINE
});

module.exports = mongoose.model("Listing", listingSchema);