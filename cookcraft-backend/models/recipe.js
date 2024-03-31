const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  quantity: {
    type: String,
  },
});

const recipeSchema = new mongoose.Schema({
  Recipe_Title: {
    type: String,
  },
  Description: {
    type: String,
  },
  image_link: {
    type: String,
  },
  portion: {
    type: String,
  },
  youtube_link: {
    type: String,
  },
  cooking_time: {
    type: String,
  },
  ingredients: [ingredientSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

mongoose.model("Recipe", recipeSchema, "recipe");
