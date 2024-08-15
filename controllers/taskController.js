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
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const tasks = await TaskSchema.find({ user: req.user.id })
      .skip(skip)
      .limit(parseInt(limit))
      .exec();
    const totalTasks = await TaskSchema.countDocuments({ user: req.user.id });

    if (!tasks) {
      return res.status(404).send({ message: "Tasks Not Found" });
    }
    return res.status(200).send({
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page,
      totalTasks,
      limit,
      tasks,
    });
  } catch (error) {
    console.error("Something Went Wrong While Fetching the Task:", error);
    return res
      .status(500)
      .json({ message: "Something Went Wrong While Fetching the Task" });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskSchema.findById(id);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res.status(200).send({ task });
  } catch (error) {
    console.error("Something went wrong while getting the task:", error);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting the task" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status, priority } = req.body;

  try {
    const task = await TaskSchema.findByIdAndUpdate(
      id,
      { title, description, dueDate, status, priority },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res.status(200).send({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Something went wrong while updating the task:", error);
    return res
      .status(500)
      .send({ message: "Something went wrong while updating the task" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskSchema.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Something Went Wrong While Deleting the Task");
    return res
      .status(500)
      .send({ message: "Something Went Wrong While Deleting the Task" });
  }
};




module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  
};
