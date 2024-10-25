import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Register from './Register';
import Login from './Login';
import Assignments from './Assignments';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/assignments" element={isAuthenticated ? <Assignments /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/assignments" />} />
      </Routes>
    </Router>
  );
};

export default App;
