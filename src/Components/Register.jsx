import React, { useState } from 'react';
import { Link,Navigate, useNavigate } from 'react-router-dom'; // ייבוא של useNavigate
import '../StyleSheet/Register.css'; // import the updated CSS file for styling
//import FullRegistration from './FullRegistration.jsx';
//import Login from './Login.jsx';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(''); // יש להוסיף את state הזה
  const [error, setError] = useState('');
  const navigate = useNavigate(); // הגדרת navigate
  localStorage.setItem("CurrentUser", '');

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
          setError("User already exists. Please go to the login page.");
          console.log('User found:', data);
          return;
        } else {
          console.log('User not found');

          // בדוק אם הסיסמאות תואמות
          if (password !== passwordVerify) {
            setError('Passwords do not match');
            return;
          }

          // אם לא קיים, נווט לדף חדש (FullRegistration) ושלח את המשתנים דרך state
          console.log('Username:', username);
          console.log('Password:', password);

          navigate('/full-registration', { state: { username, password } });
        }
      })
      .catch(error => console.error('Error fetching user:', error));
  };
  const handleLoginRedirect = () => {
    navigate('/login'); 
    //קריאת שרת לשמירת הנתונים שהוזנו
  };
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="input-group">
            <label htmlFor="passwordVerify">Verify Password</label>
            <input
              type="password"
              id="passwordVerify"
              value={passwordVerify}
              onChange={(e) => setPasswordVerify(e.target.value)}
              required
            />
          </div>

          {error && <div className="error">{error}</div>}
          <button type="submit" className="register-button">
            Register
          </button>
          <button onClick={handleLoginRedirect}>Go to Login</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
