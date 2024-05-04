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

router.post("/recipes/rate/:recipeId", async (req, res) => {
  const { userId, rating } = req.body;
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    const existingRatingIndex = recipe.ratings.findIndex(
      (r) => r.userId.toString() === userId.toString()
    );
    if (existingRatingIndex !== -1) {
      recipe.ratings[existingRatingIndex].rating = rating;
    } else {
      recipe.ratings.push({ userId, rating });
    }
    recipe.averageRating =
      recipe.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
      recipe.ratings.length;
    await recipe.save();
    res.json({ averageRating: recipe.averageRating });
  } catch (error) {
    res.status(500).send("Error rating the recipe: " + error);
  }
});

module.exports = router;
