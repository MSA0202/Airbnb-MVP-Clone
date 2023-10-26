import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Register from "./register"; // Will need to switch between pages
import Login from "./login"; // Will need to switch between pages
import MainPage from "./mainpage"; // Will need to switch between pages
import Map from "./map";

function App() {
  //const [loggedInUsers, setLoggedInUsers ] = useState([{username: "admin", password: "admin"}]);
  //Set initial state for logged in users in login page
  const [users, setUsers] = useState([
    { email: "admin@test.com", password: "admin" },
  ]);

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (email, password) => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      setLoggedInUser(user);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register users={users} setUsers={setUsers} />} />
        <Route
          path="/login"
          element={loggedInUser ? <Navigate to="/" /> : <Login onLogin={handleLogin}  />}
        />
        <Route
          path="/"
          element={loggedInUser ? <MainPage onLogout={handleLogout} loggedInUser={loggedInUser} /> : <Navigate to="/login" />}
        />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;