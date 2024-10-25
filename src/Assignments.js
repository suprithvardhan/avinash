// src/Assignments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/assignments', {
      headers: {
        Authorization: token
      }
    })
    .then(response => setAssignments(response.data))
    .catch(error => console.error(error));
  }, [token]);

  const addAssignment = async () => {
    try {
      await axios.post('http://localhost:5000/api/assignments', newAssignment, {
        headers: {
          Authorization: token
        }
      });
      setNewAssignment({ title: '', description: '' });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Assignments</h1>
      <input
        type="text"
        placeholder="Title"
        value={newAssignment.title}
        onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newAssignment.description}
        onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
      />
      <button onClick={addAssignment}>Add Assignment</button>

      {assignments.map(assignment => (
        <div key={assignment._id}>
          <h3>{assignment.title}</h3>
          <p>{assignment.description}</p>
          <h4>Reviews:</h4>
          {assignment.reviews && assignment.reviews.map((review, index) => (
            <div key={index}>
              <p>{review.reviewer}: {review.comment} (Rating: {review.rating})</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Assignments;
