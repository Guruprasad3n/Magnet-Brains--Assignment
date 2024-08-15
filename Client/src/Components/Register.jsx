import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./register.css"; // Import the CSS file for styling

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.id);
        setMessage("Registration successful! You are now logged in.");
        navigate("/home");
      } else {
        throw new Error("Failed to retrieve token. Please try again.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setMessage(
        err.response?.data?.msg ||
          err.message ||
          "An error occurred during registration"
      );
    }
  };

  return (
    <div className="parent">
      <div className="register-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-button">
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
