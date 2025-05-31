import React from 'react';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Postdetail from './Pages/PostDetailPage';
import Createpost from './Pages/CreatePostPage';
import Editpost from './Pages/EditPostPage';
import Home from './Pages/HomePage';
import Navbar from './Components/Navbar';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Createpost />} />
        <Route path='/edit/:id' element={<Editpost />} />
        <Route path='/post/:id' element={<Postdetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;