PostProject
______________________
English:
_______

PostProject is an interactive web project for managing tasks, post comments, and photo albums. The project demonstrates working with React, Vite, and a mock server (json-server) to display data in real time.

🎯 Project Goal

Task management interface (Todos)

Managing comments for posts

Displaying photo albums (Photos / Albums)

Demonstrating data retrieval and storage using a Fake API (db.json)

Modular development with separate React components for each functionality

🛠️ Technologies

Frontend: React 18, Vite

Mock Backend: json-server (Fake API)

Routing: react-router-dom

Styling: Modular CSS

Build / Dev: npm scripts, Vite Dev Server

Linting: ESLint, react-hooks, react-refresh

🚀 Installation & Run

Clone the project:

git clone https://github.com/Yael-Bloch/PostProject.git
cd PostProject


Install dependencies:

npm install


Run the mock server (json-server):

npm run json:server


The server will run at http://localhost:3000.

Run the React application:

npm run dev


The app will be available at http://localhost:5173.

📂 Project Structure
PostProject/
├─ public/           # Static files (favicon, svg)
├─ src/
│  ├─ Components/    # React components (Posts, Comments, Albums, Todos, etc.)
│  ├─ StyleSheet/    # CSS for each component
│  ├─ assets/        # Images and icons
│  ├─ main.jsx        # App entry point
│  └─ index.css       # Global CSS
├─ db.json           # Fake API
├─ package.json
├─ vite.config.js
└─ README.md

💡 Notes

The db.json can be replaced with a real API without changing the frontend code.

Each component is built modularly for easy extension and modification.

Routing is supported via react-router-dom for all application pages.

👩‍💻 Developer

Yael Bloch

_____________________________________________________________________________
עברית:
                                                                 ____________

זהו פרויקט ווב אינטראקטיבי לניהול משימות, תגובות לפוסטים וגלריית אלבומים עם תמונות. הפרויקט מדגים עבודה עם React, Vite, ושרת מדומה (json-server) להצגת נתונים בזמן אמת.

🎯 מטרת הפרויקט

יצירת ממשק ניהול משימות (Todos)

ניהול תגובות (Comments) לפוסטים

הצגת אלבומי תמונות (Photos / Albums)

הדגמת קריאה ושמירה של נתונים באמצעות Fake API (db.json)

פיתוח מודולרי עם רכיבי React נפרדים לכל פונקציונליות

🛠️ טכנולוגיות

Frontend: React 18, Vite

Backend מדומה: json-server (Fake API)

Routing: react-router-dom

Styling: CSS מודולרי

Build / Dev: npm scripts, Vite Dev Server

Linting: ESLint, react-hooks, react-refresh

🚀 התקנה והפעלה

עשה Clone לפרויקט:

git clone https://github.com/Yael-Bloch/PostProject.git
cd PostProject


התקנת תלויות:

npm install


הפעלת השרת המדומה (json-server):

npm run json:server


השרת ירוץ ב־http://localhost:3000.

הפעלת אפליקציית React:

npm run dev


אפליקציה זמינה ב־http://localhost:5173.

📂 מבנה הפרויקט
PostProject/
├─ public/           # קבצים סטטיים (favicon, svg)
├─ src/
│  ├─ Components/    # רכיבי React (Posts, Comments, Albums, Todos וכו')
│  ├─ StyleSheet/    # CSS לכל רכיב
│  ├─ assets/        # תמונות ואייקונים
│  ├─ main.jsx        # נקודת כניסה לאפליקציה
│  └─ index.css       # CSS גלובלי
├─ db.json           # Fake API
├─ package.json
├─ vite.config.js
└─ README.md

💡 דגשים

ניתן להחליף את db.json ב־API אמיתי ללא שינוי בקוד הממשק.

כל רכיב בנוי באופן מודולרי כדי לאפשר הרחבה ושינויים קלים.

קיימת תמיכה ב־Routing באמצעות react-router-dom לכל עמודי האפליקציה.

👩‍💻 מפתחי הפרויקט

יעל בלוך
