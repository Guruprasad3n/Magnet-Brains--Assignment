import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import TaskList from "./Components/TaskList"; // Example task management component
import TaskDetails from "./Components/TaskDetails"; // Example task details component
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import Login from "./Components/Login";
import Register from "./Components/Register";

const App = () => {
  return (
    <div className="App">
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
        {/* <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        /> */}
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
      </Routes>
    </div>
  );
};

export default App;






// // src/App.js
// import React from "react";
// import { Router, Routes, Route, Navigate } from "react-router-dom";
// import Register from "./Components/Register";
// import Login from "./Components/Login";
// import Home from "./Components/Home";
// import PrivateRoute from "./Components/PrivateRoute";
// import PublicRoute from "./Components/PublicRoute";

// const App = () => {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Navigate to="/home" />} />
//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <PublicRoute>
//               <Register />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/home"
//           element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;
