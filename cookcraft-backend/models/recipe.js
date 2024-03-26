const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  }
});

const recipeSchema = new mongoose.Schema({
  Recipe_Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  image_link: {
    type: String,
    required: true,
  },
  portion: {
    type: Number,
    required: true,
  },
  youtube_link: {
    type: String,
  },
  ingredients: [ingredientSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
   // required: true
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema, 'recipe');
