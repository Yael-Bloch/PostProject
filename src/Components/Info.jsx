import React, { useEffect, useState } from 'react';
import '../StyleSheet/Info.css'; // מוודא שהקובץ CSS שלך טוען את העיצוב
import Home from '../Components/Home.jsx'
const Info = () => {
  // מצב לאחסון נתוני המשתמש
  const [user, setUser] = useState(null);

  useEffect(() => {
    // שליפת הנתונים מ-localStorage בצורה בטוחה
    const storedUser = localStorage.getItem('CurrentUser');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);  // ממיר את המידע שנמצא ב-localStorage
        setUser(parsedUser);  // שומר את המידע ב-state
      } catch (error) {
        console.error('Error parsing JSON:', error);
        // אם יש שגיאה, ניתן להחזיר את המשתמש או הודעה מתאימה
      }
    } else {
      console.log('No user data in localStorage');
    }
  }, []);

  // אם אין נתונים על המשתמש, הצג הודעה
  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div>
      <Home />
      <div className="info-container">

        <div className="login-box">
          <h2>User Information</h2>

          <h4>Basic Information</h4>
          <div className="input-group">
            <label htmlFor="id">ID: </label>
            <span>{user.id}</span>
          </div>

          <div className="input-group">
            <label htmlFor="name">Name: </label>
            <span>{user.name}</span>
          </div>

          <div className="input-group">
            <label htmlFor="username">Username: </label>
            <span>{user.username}</span>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email: </label>
            <span>{user.email}</span>
          </div>

          {/* Address */}
          <h3>Address</h3>
          <div className="input-group">
            <label htmlFor="street">Street: </label>
            <span>{user.address.street}</span>
          </div>

          <div className="input-group">
            <label htmlFor="suite">Suite: </label>
            <span>{user.address.suite}</span>
          </div>

          <div className="input-group">
            <label htmlFor="city">City: </label>
            <span>{user.address.city}</span>
          </div>

          <div className="input-group">
            <label htmlFor="zipcode">Zipcode: </label>
            <span>{user.address.zipcode}</span>
          </div>

          {/* Geo Information */}
          <h4>Geographic location</h4>
          <div className="input-group">
            <label htmlFor="latitude">Latitude: </label>
            <span>{user.address.geo.lat}</span>
          </div>

          <div className="input-group">
            <label htmlFor="longitude">Longitude: </label>
            <span>{user.address.geo.lng}</span>
          </div>

          {/* Company Information */}
          <h3>Company</h3>
          <div className="input-group">
            <label htmlFor="companyName">Company Name: </label>
            <span>{user.company.name}</span>
          </div>

          <div className="input-group">
            <label htmlFor="catchPhrase">Catch phrase: </label>
            <span>{user.company.catchPhrase}</span>
          </div>

          <div className="input-group">
            <label htmlFor="bs">Business: </label>
            <span>{user.company.bs}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Info;
