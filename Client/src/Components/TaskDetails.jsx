import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/tasks/${id}`, {
          headers: { 'x-auth-token': token }
        });
        setTask(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task:', error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/${id}`, {
        headers: { 'x-auth-token': token }
      });
      navigate('/tasks');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) return <p>Loading task details...</p>;

  return (
    <div>
      <h2>Task Details</h2>
      {task ? (
        <div>
          <h3>{task.title}</h3>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Due Date:</strong> {task.dueDate}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <button onClick={handleDelete}>Delete Task</button>
        </div>
      ) : (
        <p>Task not found</p>
      )}
    </div>
  );
};

export default TaskDetails;
