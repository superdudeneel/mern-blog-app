import React from 'react'
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Posts() {
    const [posts, setposts] = useState([]);

    const populateposts = ()=>{
        
    }
    useEffect(()=>{
        populateposts();
    }, [])
    return (
        <div className='w-full flex flex-wrap justify-center gap-6 p-4'>
            <div className="relative h-80 w-[280px] rounded-md overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 flex items-center justify-center h-full text-white px-4 text-center">
                <h2 className="text-xl font-semibold">Your Blog Title</h2>
                </div>
            </div>
            <div className="relative h-80 w-[280px] rounded-md overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 flex items-center justify-center h-full text-white px-4 text-center">
                <h2 className="text-xl font-semibold">Your Blog Title</h2>
                </div>
            </div>
        </div>
    )
}

export default Posts