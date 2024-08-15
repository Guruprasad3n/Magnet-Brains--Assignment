const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const taskRouter = require("./routes/tasksRoute");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

// Connect to Database
connectDB();

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Connected at port No http://localhost:${PORT}`);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// const express = require("express");
// const dotenv = require("dotenv").config();
// const app = express();
// const cors = require("cors");
// const connectDB = require("./config/db");
// const userRouter = require("./routes/userRoute");
// const taskRouter = require("./routes/tasksRoute");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Welcome to Home Page");
// });
// app.use("/api/auth", userRouter)
// app.use("/api/tasks", taskRouter)

// const PORT = process.env.PORT;
// app.listen(PORT, (req, res) => {
//   console.log(`Server Connected at port No http://localhost:${PORT}`);
// });
