const mongoose = require("mongoose");
const User = mongoose.model("User");
const Menu = mongoose.model("Menu");
const express = require("express");
const router = express.Router();
// Endpoint to get grocery suggestions based on meal patterns
router.get("/user/:userId/groceries/suggestions", async (req, res) => {
  try {
    const { userId } = req.params;
    const menus = await Menu.find({ user_id: userId });
    console.log("Menus:", menus); // Check what menus are being fetched

    const ingredientFrequency = {};
    menus.forEach((menu) => {
      console.log("Menu Items:", menu.items); // Verify each menu's items
      menu.items.forEach((item) => {
        ingredientFrequency[item.name] =
          (ingredientFrequency[item.name] || 0) + 1;
      });
    });

    console.log("Ingredient Frequency:", ingredientFrequency); // Check frequencies

    const suggestedGroceries = Object.entries(ingredientFrequency).map(
      ([name]) => ({ name, quantity: "1" })
    );

    console.log("Suggested Groceries:", suggestedGroceries); // Verify final suggestions
    res.json(suggestedGroceries);
  } catch (error) {
    console.error("Failed to fetch grocery suggestions:", error);
    res.status(500).send("Error fetching grocery suggestions");
  }
});

// Assuming adding directly to the User document for simplicity
router.post("/user/:userId/groceries", async (req, res) => {
  const { userId } = req.params;
  const { name, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user.groceries) {
      user.groceries = []; // Ensure there's a groceries field, adjust schema as needed
    }
    user.groceries.push({ name, quantity, addedManually: true });
    await user.save();
    res.status(201).send("Grocery item added successfully.");
  } catch (error) {
    console.error("Error adding grocery item:", error);
    res.status(500).send("Error adding grocery item");
  }
});

// Get all groceries for a user
router.get("/user/:userId/groceries", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user.groceries);
  } catch (error) {
    console.error("Error fetching groceries:", error);
    res.status(500).send("Error fetching groceries");
  }
});

module.exports = router;
