import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', user);
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
