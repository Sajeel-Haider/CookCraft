
const express = require('express');

const connectDB = require("./database/db");
const bodyParser =require('body-parser')
const app = express();
const PORT = process.env.PORT || 8080;
require('./models/User');

const userRoutes = require('./routes/userRoutes');
const authRoutes=require("./routes/authRoutes")

app.use(bodyParser.json())
app.use(authRoutes)
app.use(userRoutes)

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
