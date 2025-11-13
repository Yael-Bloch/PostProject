import { useState } from 'react';
import '../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import FullRegistration from './FullRegistration.jsx';
import Info from './Info.jsx';
import Albums from './Albums.jsx';
import Todos from './Todos.jsx';
import Posts from './Posts.jsx';
import Photos from './Photos.jsx';
import Comments from './Comments.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    //<BrowserRouter>
    <Routes>
      <Route index path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Home />} />
      <Route path="/full-registration" element={<FullRegistration />} />
      <Route path="/info" element={<Info />} />
      <Route path="/albums" element={<Albums />}/>
      <Route path="/albums/:id/photos" element={<Photos />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/posts/:id/comments" element={<Comments />} />
      
    </Routes>
    //</BrowserRouter>
  );
}

export default App;
