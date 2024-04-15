const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Menu = mongoose.model("Menu");

router.post("/menu/addDish", async (req, res) => {
  try {
    const { user_id, date, name, type, mealType } = req.body;
    console.log(req.body);
    let menuItem = await Menu.findOne({ date });

    if (!menuItem) {
      menuItem = new Menu({ user_id, date });
    }

    menuItem.items.push({ name, type, mealType });

    await menuItem.save();
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/menu/all", async (req, res) => {
  try {
    const allMenuData = await Menu.find({});

    if (!allMenuData || allMenuData.length == 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(allMenuData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/menu/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const menuData = await Menu.find({ user_id: userId });

    if (!menuData || menuData.length === 0) {
      return res.status(404).json({ message: "Menu not found for this user" });
    }

    res.status(200).json(menuData);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/copyItems", async (req, res) => {
  try {
    const { prevDate, nextDate, user_id } = req.body;

    // Find the previous menu items for the specific user
    const prevMenu = await Menu.findOne({
      date: prevDate,
      user_id: user_id,
    });
    if (!prevMenu) {
      return res
        .status(404)
        .json({ message: "Previous menu items not found for this user" });
    }

    // Find or create the next menu for the specific user
    let nextMenu = await Menu.findOne({
      date: nextDate,
      user_id: user_id,
    });
    if (!nextMenu) {
      nextMenu = new Menu({ date: nextDate, items: prevMenu.items });
    } else {
      nextMenu.items = prevMenu.items;
    }

    await nextMenu.save();

    res.status(200).json({ message: "Items copied successfully" });
  } catch (error) {
    console.error("Error copying items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/deleteItems/:date/:user_id", async (req, res) => {
  const { date, user_id } = req.params;

  try {
    const deletedItem = await Menu.findOneAndDelete({ date, user_id });

    if (deletedItem) {
      res.status(200).json({ message: "Items deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Items not found for this user and date" });
    }
  } catch (error) {
    console.error("Error deleting items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
