import { useState, useEffect } from 'react'

import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog'
import MyBlog from './pages/MyBlog';

function App() {
  
  return (
    <Routes>
      <Route path ='/' element = {<Home/>}/>
      <Route path ='/login' element = {<Login/>}/>
      <Route path ='/register' element = {<Register/>}/>
      <Route path ='/blog/:id' element = {<Blog/>}/>
      <Route path ='/myblog' element = {<MyBlog/>}/>
    </Routes>
  )
}

export default App
