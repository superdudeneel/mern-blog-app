import React from 'react'
import Header from '../components/Header'
import Posts from '../components/Posts'
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import BlogCard from '../components/BlogCard'

function Home() {
  const [blogs, setblogs] = useState([]);
  const populateblogs = async ()=>{
    const response = await fetch('http://localhost:5400/api/getblogs', {
      method: 'GET',
      credentials: 'include',
    })
    const result = await response.json();
    if(result.success){
      setblogs(result.blogs);

    }
  }
  function truncateText(text, maxLength = 150) {
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }
  useEffect(()=>{
    populateblogs();

  })
  return (
    <div className = 'overflow-y-hidden'>
      <Header/>
      <div className = 'bg-white h-67 mt-10 flex flex-col items-center py-3 text-center'>
        <div className = 'bg-gray-300 text-gray-800 rounded-full px-2 py-1'>Blog</div>
        <h1 className = 'font-bold text-4xl text-gray-800 mt-4'>Discover our latest news</h1>
        <div className = 'md:max-w-3xl sm:max-w-sm'>
          <p className =  'text-md text-gray-600 mt-5'>From in-depth tech articles and programming guides to lighthearted lifestyle blogs and personal reflections — explore a diverse collection of blogs tailored to suit every interest, mood, and moment.</p>
        </div>
        <button className = 'cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-md mt-5 hover:bg-blue-700' onClick = {()=>{
          window.location.href = '/myblog'
        }} >My Blogs</button>
      </div>
      <div className='flex flex-wrap gap-1 justify-center'>
        {blogs.map((b)=>(
            <BlogCard
            id = {b._id}
            date={b.date}
            CardTitle={b.title}
            author = {b.author}
            CardDescription={truncateText(b.content, 200)}
            image={`http://localhost:5400/uploads/${b.image}`}
            />
        ))}
      </div>
    </div>
  )
}

export default Home