import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!token) return null;

  return (
    <nav className="navbar">
      <div className="nav-links">
        <ul>
          <li><Link to="/home">Task List</Link></li>
          <li><Link to="/create">create</Link></li>
          <li><Link to="/create-task">Create Task</Link></li>
        </ul>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
