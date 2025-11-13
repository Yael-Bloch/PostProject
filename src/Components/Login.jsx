

import React, { useEffect, useState } from 'react';
import '../StyleSheet/Login.css'; // import the CSS file for styling
import { Link, Navigate,useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
  localStorage.setItem("CurrentUser", '');
  localStorage.setItem("AlbumsToShowOfCurrentUser", []);
  localStorage.setItem("AllAlbumsOfCurrentUser", []);
  },[username,password])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/users?username=${username}&website=${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            console.log('User found:', data[0]);
            localStorage.setItem("CurrentUser", JSON.stringify(data[0]));
            navigate('/todos');
          } else {
           setError('User not found pass to Registration');
          }
        })
        .catch(error => console.error('Error fetching user:', error));
    // כאן תוכל להוסיף את הלוגיקה לבדוק את הנתונים
    console.log('Username:', username);
    console.log('Password:', password);
  };
  const handleRegisterRedirect = () => {
    navigate('/register'); 
  };
  
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
         <p>{error}</p>
        <button type="submit" className="login-button">
          Login
        </button>
        <button onClick={handleRegisterRedirect}>Go to Registration</button>
      </form>
    </div>
  );
}

export default Login;
