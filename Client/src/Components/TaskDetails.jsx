import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./taskDetails.css";

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(response.data.task);
        setEditedTask({
          title: response.data.task.title,
          description: response.data.task.description,
          dueDate: response.data.task.dueDate,
          status: response.data.task.status,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/home");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/tasks/${id}`, editedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTask(editedTask);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading task details...</p>;

  return (
    <div className="task-details-container">
      <h2>Task Details</h2>
      {task ? (
        <div>
          <h3>{task.title}</h3>
          <p>
            <strong>Description:</strong> {task.description}
          </p>
          <p>
            <strong>Due Date:</strong> {task.dueDate}
          </p>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
          <div className="button-group">
            <button onClick={toggleEditModal}>Edit Task</button>
            <button className="delete-button" onClick={toggleDeleteModal}>
              Delete Task
            </button>
          </div>
        </div>
      ) : (
        <p>Task not found</p>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="confirm-button">
                Yes
              </button>
              <button onClick={toggleDeleteModal} className="cancel-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit();
              }}
            >
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editedTask.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={editedTask.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">Due Date:</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={editedTask.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  name="status"
                  value={editedTask.status}
                  onChange={handleChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="confirm-button">
                  Save
                </button>
                <button onClick={toggleEditModal} className="cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;