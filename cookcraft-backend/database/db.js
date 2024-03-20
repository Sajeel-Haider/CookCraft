const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ahmed40152:ahmedabdulla@cluster0.k7swoq1.mongodb.net/";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
