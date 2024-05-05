const mongoose = require("mongoose");

const GroceryItemSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  addedManually: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Number,
    default: 0,
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  groceries: [GroceryItemSchema],
});

mongoose.model("User", userSchema, "users");
