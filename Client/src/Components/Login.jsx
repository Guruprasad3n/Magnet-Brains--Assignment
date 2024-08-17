import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/login.css";

const Login = () => {
  const [email, setEmail] = useState("gp76652@gmail.com");
  const [password, setPassword] = useState("1234");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("name", res.data.name);
        setMessage("Login successful!");
        setIsError(false);
        navigate("/home");
      } else {
        setMessage("Failed to retrieve token. Please try again.");
        setIsError(true);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setMessage(err.response?.data?.msg || "Invalid credentials");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parent">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p>
            I don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
        {message && (
          <p className={`message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;