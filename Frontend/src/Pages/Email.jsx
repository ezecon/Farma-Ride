import React, { useState } from 'react';
import axios from 'axios';

function Email() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete('http://localhost:5000/api/users/delete', {
        data: { email },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="App">
      <h1>Delete User by Email</h1>
      <form onSubmit={handleDelete}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
        <button type="submit">Delete User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Email;
