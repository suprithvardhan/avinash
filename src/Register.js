import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', user);
      alert('User registered successfully');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
