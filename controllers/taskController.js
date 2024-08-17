const TaskSchema = require("../models/taskSchema");

const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    const newTask = new TaskSchema({
      user: req.user.id,
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : new Date(),
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
    const task = await TaskSchema.findById(id).populate(
      "assignedUsers",
      "name"
    );

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
  const { title, description, dueDate, status, priority, assignedUsers } =
    req.body;

  try {
    const task = await TaskSchema.findByIdAndUpdate(
      id,
      { title, description, dueDate, status, priority, assignedUsers },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    if (assignedUsers) {
      task.assignedUsers = assignedUsers;
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (status) task.status = status;
    if (priority) task.priority = priority;

    const updatedTask = await task.save();

    return res
      .status(200)
      .send({ message: "Task updated successfully", task: updatedTask });
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

// const assignUsersToTask = async (req, res) => {
//   const { id } = req.params;
//   const { users } = req.body;

//   try {
//     const task = await TaskSchema.findByIdAndUpdate(
//       id,
//       { $addToSet: { assignedUsers: { $each: users } } },
//       { new: true, runValidators: true }
//     ).populate("assignedUsers", "-password");

//     if (!task) {
//       return res.status(404).send({ message: "Task not found" });
//     }

//     return res
//       .status(200)
//       .send({ message: "Users assigned successfully", task });
//   } catch (error) {
//     console.error(
//       "Something went wrong while assigning users to the task:",
//       error
//     );
//     return res.status(500).send({
//       message: "Something went wrong while assigning users to the task",
//     });
//   }
// };

const assignUsersToTask = async (req, res) => {
  const { id } = req.params;
  const { users } = req.body;

  try {
    // Find the task by ID and update it by adding the users to the assignedUsers field
    const task = await TaskSchema.findByIdAndUpdate(
      id,
      { $addToSet: { assignedUsers: { $each: users } } }, // Add users without duplicates
      { new: true, runValidators: true }
    ).populate("assignedUsers", "name email"); // Populate with user name and email, excluding the password

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res
      .status(200)
      .send({ message: "Users assigned successfully", task });
  } catch (error) {
    console.error(
      "Something went wrong while assigning users to the task:",
      error
    );
    return res.status(500).send({
      message: "Something went wrong while assigning users to the task",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignUsersToTask,
};
