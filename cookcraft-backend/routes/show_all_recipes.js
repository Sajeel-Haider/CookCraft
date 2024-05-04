const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipe = mongoose.model("Recipe");

router.get("/recipes/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: "Invalid user ID format" });
  }

  try {
    const recipes = await Recipe.find({ user: userId });
    if (recipes.length === 0) {
      return res
        .status(401)
        .send({ message: "No recipes found for this user" });
    }
    res.json(recipes);
  } catch (error) {
    console.error("Failed to retrieve recipes:", error);
    res
      .status(500)
      .send({ message: "Failed to retrieve recipes", error: error.message });
  }
});

router.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error("Failed to retrieve recipes:", error);
    res
      .status(500)
      .send({ message: "Failed to retrieve recipes", error: error.message });
  }
});

router.get("/recipe/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  Recipe.findById(recipeId)
    .then((recipe) => {
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ error: "Recipe not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Error fetching recipe" });
    });
});

module.exports = router;
