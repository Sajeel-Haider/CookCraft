const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipe = mongoose.model("Recipe");

router.post("/addRecipe", async (req, res) => {
  const {
    Recipe_Title,
    Description,
    image_link,
    portion,
    youtube_link,
    ingredients,
    cooking_time,
    user,
  } = req.body;

  try {
    const newRecipe = new Recipe({
      Recipe_Title,
      Description,
      image_link,
      portion,
      youtube_link,
      ingredients,
      cooking_time,
      user,
    });
    try {
      const savedRecipe = await newRecipe.save();
      console.log("Recipe saved successfully:", savedRecipe);
    } catch (error) {
      console.error("Error saving recipe:", error.message);
      throw error;
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error: "Failed to add recipe" });
  }
});

router.delete("/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await Recipe.findByIdAndDelete(recipeId);
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res
      .status(500)
      .json({ message: "Failed to delete recipe", error: error.message });
  }
});
module.exports = router;
