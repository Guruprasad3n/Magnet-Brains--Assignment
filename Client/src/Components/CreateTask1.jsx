import { useState } from "react";
import axios from "axios";

function CreateTask1() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("2024-01-01");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      dueDate,
      priority,
    };
    try {
      const response = await fetch("http://localhost:8000/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Task created:", data);
        setMessage("Task created successfully!");
        setTitle("");
        setDescription("");
        setDueDate("2024-01-01");
        setPriority("Low");
      } else {
        const errorData = await response.json();
        setMessage(`Failed to create task: ${errorData.message}`);
      }
    } catch (e) {
      console.error("Error creating task:", e);
    }
  };

  return (
    <>
      <div className="create-task-container">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Create Task</button>
        </form>
      </div>
    </>
  );
}

export default CreateTask1;
