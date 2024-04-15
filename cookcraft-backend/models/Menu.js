const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      mealType: {
        type: String,
        required: true,
      },
    },
  ],
});

mongoose.model("Menu", menuSchema, "menu");
