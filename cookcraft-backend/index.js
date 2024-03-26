const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const bodyParser = require("body-parser");

require("./models/User");
require("./models/recipe")

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const add_recipe = require("./routes/add_recipe");
const show_all_recipe=require("./routes/show_all_recipes");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(authRoutes);
app.use(userRoutes);
app.use(add_recipe);
app.use(show_all_recipe);

const startApp = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server Running on PORT: ", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
