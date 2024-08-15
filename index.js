const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});
app.use("/api/auth", userRouter)

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`Server Connected at port No http://localhost:${PORT}`);
});
