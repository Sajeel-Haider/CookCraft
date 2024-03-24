const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred fetching users");
  }
});

module.exports = router;
