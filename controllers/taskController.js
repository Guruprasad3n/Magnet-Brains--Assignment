const TaskSchema = require("../models/taskSchema");

const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    const newTask = new TaskSchema({
      user: req.user.id,
      title,
      description,
      dueDate,
      priority,
    });
    const task = await newTask.save();
    return res.status(201).send({ message: "Successfully Task Created", task });
  } catch (error) {
    console.log("Something Went Wrong While Creating the Task");
    return res
      .status(500)
      .send({ message: "Something Went Wrong While Creating the Task" });
  }
};
const getTasks = async (req, res) => {
  try {
    return res.status(200).send({ task });
  } catch (error) {
    console.log("Something Went Wrong While Fetching the Task");
    return res
      .status(500)
      .send({ message: "Something Went Wrong While Fetching the Task" });
  }
};
const getTaskById = async (req, res) => {
  try {
    return res.status(200).send({ task });
  } catch (error) {
    console.log("Something Went Wrong While getting Single the Task");
    return res
      .status(500)
      .send({ message: "Something Went Wrong While getting Single the Task" });
  }
};
const updateTask = async (req, res) => {
  try {
    return res.status(200).send({ task });
  } catch (error) {
    console.log("Something Went Wrong While Updating the Task");
    return res
      .status(500)
      .send({ message: "Something Went Wrong While Updating the Task" });
  }
};
const deleteTask = async (req, res) => {
  try {
    return res.status(200).send({ task });
  } catch (error) {
    console.log("Something Went Wrong While Deleting the Task");
    return res
      .status(500)
      .send({ message: "Something Went Wrong While Deleting the Task" });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
