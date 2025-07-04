import React from 'react'
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useParams } from "react-router-dom";
import Header from '../components/Header';

function Blog() {
  let params = useParams();
  const id = params.id;
  const [blog, setblog] = useState({})
  const [user, setuser] = useState({})
  const loadblog = async ()=>{
      const response = await fetch(`http://localhost:5400/api/blog/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
      const result = await response.json();
      if(result.success){
        setblog(result.blog);
        setuser(result.user);
      }

  }
  useEffect(()=>{
    
    loadblog();

  }, [])
  return (
    <>
      <Header/>
      <div className="max-w-3xl mx-60 mt-10  bg-white overflow-hidden relative ">
      {/* Blog Image */}
        <img src={`http://localhost:5400/uploads/${blog.image}`} alt={blog.title} className="w-full h-96 object-cover" />

      {/* Blog Content */}
        <div className="p-5 right-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">By {blog.author}</h1>
          <p className = 'text-gray-600 mb-2'>{user.email}</p>
          {blog.date && (
            <p className=" bg-indigo-700 w-30 px-4 py-3 rounded-md text-sm text-gray-50 mb-5">{new Date(blog.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    })}</p>
          )}

          <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog