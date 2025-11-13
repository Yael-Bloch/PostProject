import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';  // ייבוא useNavigate לניהול ניווט
import { Link } from 'react-router-dom';  // ייבוא של Link ליצירת קישורים
import '../StyleSheet/Home.css';
function Home() {
  let currentUser = '';
  try {
    const currentUserString = localStorage.getItem('CurrentUser');
    currentUser = currentUserString ? JSON.parse(currentUserString) : '';
  } catch (e) {
    console.error('Error parsing CurrentUser:', e);
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const fullName = currentUser.name || 'User';  // אם אין שם, נשתמש במילה 'User' ברירת מחדל

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('CurrentUser');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome, {fullName}</h1>
      </header>
      <div className="home-buttons">
        <button onClick={() => navigate('/info')}>Info</button>
        <button onClick={() => navigate('/todos')}>Todos</button>
        <button onClick={() => navigate('/posts')}>Posts</button>
        <button onClick={() => navigate('/albums')}>Albums</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="home-content">

        <h2>Select an option above to view content</h2>
      </div>
    </div>
  );
}

export default Home;
