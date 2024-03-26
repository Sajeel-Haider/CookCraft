const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model("User");
// const jwt = require("jsonwebtoken");
// const secretKey = "YOUR_SECRET_KEY";

router.post("/signup", async (req, res) => {
  console.log(req.body);

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).send({ error: "Need email, password, and name" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = new User({ email, password: hashedPassword, name });
      await user.save();
      console.log("User saved successfully!");
    } catch (error) {
      console.error("Error saving user:", error);
    }

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Create a token that includes the user's ID in the payload
      // const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

      // Send the token back to the client
      res.status(200).send({ message: "Login successful", user: user }); //, token: token });
    } else {
      return res.status(401).send({ error: "Invalid password" });
    }

    // res.status(200).send({ message: "Login successful", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
