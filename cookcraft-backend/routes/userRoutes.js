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

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
// Assuming express and mongoose setup is already done.
router.post("/user/follow", async (req, res) => {
  const { userId, followUserId } = req.body;
  try {
    const user = await User.findById(userId);
    const followUser = await User.findById(followUserId);

    if (!user.following.includes(followUserId)) {
      user.following.push(followUserId); // Assuming 'following' is an array of user IDs
      await user.save();
    }

    if (!followUser.followers.includes(userId)) {
      followUser.followers.push(userId); // Assuming 'followers' is an array of user IDs
      await followUser.save();
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating follow status");
  }
});
// Assuming express and mongoose setup is already done.
router.get("/user/followers/count/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("followers");
    res.json({ count: user.followers.length });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving follower count");
  }
});

router.get("/user/following/count/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("following");
    res.json({ count: user.following.length });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving following count");
  }
});

module.exports = router;
