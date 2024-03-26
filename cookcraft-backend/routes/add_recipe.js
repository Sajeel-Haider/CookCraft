const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipe = mongoose.model("Recipe");

// const jwt = require('jsonwebtoken');
// const secretKey = 'YOUR_SECRET_KEY'; // Replace with the secret key used to sign the JWT

router.post("/add-recipe", async (req, res) => {
  const {
    Recipe_Title,
    Description,
    image_link,
    portion,
    youtube_link,
    ingredients,
    user,
  } = req.body;
  console.log(req.body);
  // Token is usually sent in the Authorization header
  //const token = req.headers.authorization?.split(' ')[1];

  // if (!token) {
  //   return res.status(403).send({ error: "A token is required for authentication" });
  // }

  try {
    // Verify the token
    // const decoded = jwt.verify(token, secretKey);
    // const userId = decoded.userId; // Your payload should include the userId when you sign the token

    // Create a new recipe with the user's ObjectId
    const newRecipe = new Recipe({
      Recipe_Title,
      Description,
      image_link,
      portion,
      youtube_link,
      ingredients,
      //user: userId
      user,
    });

    // Save the new recipe
    const savedRecipe = await newRecipe.save();
    res.status(201).send(savedRecipe);
  } catch (error) {
    res.status(500).send({ error: "Failed to add recipe" });
  }
});

module.exports = router;
