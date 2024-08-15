const express = require("express");
const auth = require("../middleware/auth");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
router.post("/", auth, createTask);

// @route   GET api/tasks
// @desc    Get all tasks for the user with pagination
// @access  Private
router.get("/", auth, getTasks);

// @route   GET api/tasks/:id
// @desc    Get a task by ID
// @access  Private
router.get("/:id", auth, getTaskById);

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put("/:id", auth, updateTask);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", auth, deleteTask);

module.exports = router;
