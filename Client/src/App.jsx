import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import TaskList from "./Components/TaskList"; // Example task management component
import TaskDetails from "./Components/TaskDetails"; // Example task details component
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import "./Components/navbar.css";
import CreateTask from "./Components/CreateTask";
import CreateTask1 from "./Components/CreateTask1";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      {token && <Navbar />}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/create-task"
            element={
              <PrivateRoute>
                <CreateTask />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <PrivateRoute>
                <TaskDetails />
              </PrivateRoute>
            }
          />
          <Route path="create" element={<CreateTask1 />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;