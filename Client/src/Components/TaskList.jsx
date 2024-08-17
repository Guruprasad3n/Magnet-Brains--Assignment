import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import "./CSS/taskList.css";

const TaskList = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const loaderStyle = {
    border: "5px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "5px solid #3498db",
    width: "80px",
    height: "80px",
    animation: "spin 2s linear infinite",
  };

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,
      styleSheet.cssRules.length
    );
  }, []);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("pending");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getTasks = async (page = 1) => {
    let token = localStorage.getItem("token");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(`/api/tasks?page=${page}&limit=20`, {
        headers,
      });
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks(currentPage);
  }, [currentPage]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handlePriorityChange = async (taskId, newPriority) => {
    let token = localStorage.getItem("token");

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.put(
        `/api/tasks/${taskId}`,
        { priority: newPriority },
        { headers }
      );

      if (response.status === 200) {
        getTasks(currentPage);
      }
    } catch (error) {
      console.error("Error updating task priority:", error);
      setError("Failed to update task priority. Please try again later.");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      task.status === filter &&
      (priorityFilter === "all" || task.priority === priorityFilter)
    );
  });

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loaderStyle}></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="task-list-container">
      <div className="task-filter">
        <label htmlFor="task-filter">Select Task Type:</label>
        <select
          id="task-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="pending">Pending Tasks</option>
          <option value="completed">Completed Tasks</option>
        </select>
      </div>

      <div className="priority-filter">
        <label>Priority:</label>
        <input
          type="radio"
          id="priority-all"
          name="priority"
          value="all"
          checked={priorityFilter === "all"}
          onChange={(e) => setPriorityFilter(e.target.value)}
        />
        <label htmlFor="priority-all">All</label>

        <input
          type="radio"
          id="priority-low"
          name="priority"
          value="low"
          checked={priorityFilter === "low"}
          onChange={(e) => setPriorityFilter(e.target.value)}
        />
        <label htmlFor="priority-low">Low</label>

        <input
          type="radio"
          id="priority-medium"
          name="priority"
          value="medium"
          checked={priorityFilter === "medium"}
          onChange={(e) => setPriorityFilter(e.target.value)}
        />
        <label htmlFor="priority-medium">Medium</label>

        <input
          type="radio"
          id="priority-high"
          name="priority"
          value="high"
          checked={priorityFilter === "high"}
          onChange={(e) => setPriorityFilter(e.target.value)}
        />
        <label htmlFor="priority-high">High</label>
      </div>

      <div className="task-container">
        <h3>{filter === "pending" ? "Pending Tasks" : "Completed Tasks"}</h3>
        {filteredTasks.length === 0 ? (
          <p>No {filter === "pending" ? "pending" : "completed"} tasks.</p>
        ) : (
          <ul className="task-list">
            {filteredTasks.map((task) => (
              <Link to={`/tasks/${task._id}`} key={task._id}>
                <li className={`task-item ${task.priority}`}>
                  <h2 style={{ color: "white" }}>{task.title}</h2>
                  <p>
                    {formatDate(task.dueDate)} - {task.status}
                  </p>
                  <select
                    disabled
                    value={task.priority}
                    onChange={(e) => {
                      e.stopPropagation();
                      handlePriorityChange(task._id, e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TaskList;
