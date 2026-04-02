const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: String,
  listing: mongoose.Schema.Types.ObjectId,
  fromDate: String,
  toDate: String
});

module.exports = mongoose.model("Booking", bookingSchema);