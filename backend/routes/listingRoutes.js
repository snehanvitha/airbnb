const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");

// Add Property
router.post("/", async (req, res) => {
  try {
    const { title, location, price, image, description, user } = req.body;

    const listing = await Listing.create({
      title,
      location,
      price,
      image,
      description,
      user   // 🔥 IMPORTANT
    });

    res.json(listing);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error adding listing" });
  }
});

// Get All Properties
router.get("/", async (req, res) => {
  const listings = await Listing.find();
  res.json(listings);
});

// UPDATE LISTING

router.put("/:id", async (req, res) => {
  try {
    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Update failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log("Deleting ID:", req.params.id); // 🔥 debug

    const deleted = await Listing.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    console.log(err); // 🔥 see error
    res.status(500).json({ msg: "Delete failed" });
  }
});

module.exports = router;