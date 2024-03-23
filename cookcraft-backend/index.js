const express = require("express");
const connectDB = require("./database/db");

const app = express();
const PORT = process.env.PORT || 8080;
app.get('/',(req,res)=>{
  res.send('hello')
})

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
