const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create booking
router.post("/", async (req, res) => {
  try {
    const { listing, fromDate, toDate, user } = req.body;

    // 🔥 CHECK EXISTING BOOKINGS
    const existing = await Booking.find({
      listing,
      $or: [
        {
          fromDate: { $lte: toDate },
          toDate: { $gte: fromDate }
        }
      ]
    });

    if (existing.length > 0) {
      return res.status(400).json({
        msg: "Property already booked for selected dates"
      });
    }

    // ✅ CREATE BOOKING
    const booking = await Booking.create({
      listing,
      fromDate,
      toDate,
      user
    });

    res.json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Booking failed" });
  }
});

// Get bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching bookings" });
  }
});

module.exports = router;