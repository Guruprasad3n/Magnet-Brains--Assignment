import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    navigate("/login");
  };

  if (!token) return null;

  return (
    <nav className="navbar">
      <div className="nav-links">
        <ul>
          <li>
            <Link to="/home">Task List</Link>
          </li>
          {/* <li>
            <Link to="/create">create</Link>
          </li> */}
          <li>
            <Link to="/create-task">Create Task</Link>
          </li>
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <span>Welcome, {userName}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
