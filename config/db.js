const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    const connection = await mongoose.connect(
      `mongodb://localhost:27017/magnet`
    );
    console.log("Database Connected");
  } catch (e) {
    console.log(e);
  }
};
module.exports = connectDB;
