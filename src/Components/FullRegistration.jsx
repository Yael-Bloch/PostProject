import React, { useState } from 'react';
import '../StyleSheet/FullRegistration.css'; // שימוש באותו CSS
import { useLocation,useNavigate } from 'react-router-dom';  // ייבוא useLocation

function FullRegistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [longtitude, setLongtitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [CompanyCatchPhrase, setCompanyCatchPhrase] = useState('');
  const [companyBs, setCompanyBs] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();  // שימוש ב-useLocation כדי לגשת ל-state שנשלח
  const { username, password } = location.state || {};  // קבלת הנתונים מה-state
  const navigate = useNavigate();
 // const [id,setId]=useState();
  localStorage.setItem("CurrentUser", '');
let nextUserId;
let lastUserId;
  fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(users => {
    if (users.length > 0) {
      lastUserId = Number(users[users.length - 1].id);
      nextUserId = lastUserId + 1;
    } else {
      const nextUserId = 1;
      console.log('לא נמצאו משתמשים.');
    }
  })
  .catch(error => console.error('שגיאה בקריאת ה-API:', error));

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן תוכל להוסיף את הקוד לשמירת הנתונים או לשלוח אותם לשרת
    console.log('Form Submitted');
    //קודם נעשה קריאת GET לקבל את היוזר שהוספנו רק עם 2 פרמטרים, ואז נוסיף לו את שאר הפרמטרים
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:`${nextUserId}`,
        name:name,
        username: username,
        email:email,
        address: {
        street: street,
        suite: suite,
        city: city,
        zipcode: zipcode,
        geo: {
          lat: latitude,
          lng: longtitude
        }
      },
      phone: phone,
      website: password,
      company: {
        name: companyName,
        catchPhrase: CompanyCatchPhrase,
        bs: companyBs
      }
      }),
    })
    .then(response => response.json())
    .then(data => {
      // אם נוצר משתמש בהצלחה
      console.log('User added:', data);
      localStorage.setItem("CurrentUser", JSON.stringify(data));
      navigate('/todos'); ;
    })
    .catch(error => {
      console.error('Error adding user:', error);
      setError('Error adding user to the system.');
    });
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Full Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <div>User Name: {username}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <div>website: {password}</div>
            </div>
          </div>

          <h3>Address:</h3>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="suite">Suite</label>
              <input
                type="text"
                id="suite"
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="zipcode">Zipcode</label>
              <input
                type="text"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
              />
            </div>
          </div>

          <h4>Geography location:</h4>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="longtitude">Longitude</label>
              <input
                type="text"
                id="longtitude"
                value={longtitude}
                onChange={(e) => setLongtitude(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <h3>Company:</h3>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="CompanyCatchPhrase">Company Catch Phrase</label>
              <input
                type="text"
                id="CompanyCatchPhrase"
                value={CompanyCatchPhrase}
                onChange={(e) => setCompanyCatchPhrase(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="CompanyBs">Company Bs</label>
              <input
                type="text"
                id="CompanyBs"
                value={companyBs}
                onChange={(e) => setCompanyBs(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="register-button">
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}

export default FullRegistration;
