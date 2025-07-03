import React from 'react'
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import BlogCard from '../components/BlogCard'
import Swal from 'sweetalert2'

function MyBlog() {

    const [user, setuser] = useState({});
    const [isauthenticated, setisauthenciated] = useState(false);
    const [newblog, setnewblog] = useState({
        UserId: '',
        title: '',
        content: '',
        image: '',
        author:'',
        date:Date.now(),
    })
    const [myblogs, setmyblogs] = useState([]);
    const [add, setadd] = useState(false);
    const [imagePreview, setimagePreview] = useState(false);
    const [imgurl, setimgurl] = useState('');
    const [imageFile, setImageFile] = useState(null);



    const checkauth = async ()=>{
        const response = await fetch('http://localhost:5400/api/checkauth', {
            method: 'GET',
            credentials: 'include',
        })
        const result = await response.json();
        if(result.success){
            setisauthenciated(true);
            setuser(result.user);

        }
        else{
            setTimeout(()=>{
                window.location.href = '/login';
            }, 1300)
        }
    }

    const populateblogs = async ()=>{
        const response = await fetch('http://localhost:5400/api/getuserblogs', {
            method: 'GET',
            credentials: 'include',
        })
        const result = await response.json();
        if(result.success){
            setmyblogs(result.blogs);

        }
    }


    const handlesubmit =async  (e)=>{
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', newblog.title);
        formData.append('content', newblog.content);
        formData.append('author', user.name);
        formData.append('image', imageFile);
        formData.append('date', newblog.date)
        const response = await fetch('http://localhost:5400/api/addblog', {
            method: 'POST',
            credentials: 'include',
            body: formData,

        })
        const result = await response.json();
        if(result.success){
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: result.message,
                showConfirmButton: true,
                timer: 1200,
                confirmButtonText: 'Ok',
                showCloseButton: true,
            })
            setmyblogs(prev => [...prev, {
                ...newblog,
                author: user.name,
                image: result.blog.image,
                UserId: user.id, 
                _id: result.blog._id,
            }]);
            setnewblog({
                UserId: '',
                title: '',
                content: '',
                image: '',
                author:'',
                date:Date.now(),
            })
            setadd(false);
            
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.message,
                showConfirmButton: true,
                confirmButtonText: 'Try Again',
                showCloseButton: true,
            })
        }
    }

    function truncateText(text, maxLength = 150) {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    }


    useEffect(()=>{
        checkauth();

    }, [])
    useEffect(()=>{
        if(user){
            populateblogs();
        }
    }, [user])
  return (
    <>
        {!isauthenticated && (
            <div className = 'bg-white flex items-center justify-center h-screen'>
                <button type="button" class="bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center" disabled>
                    <svg class="mr-2 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
                    </svg>
                    Processing…
                </button>
            </div>
        )}
        {isauthenticated && !add && (
            <div className = 'bg-white h-screen flex flex-col justify-center items-center overflow-y-hidden'>
                <button className = 'cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-md' onClick = {()=>{
                    setadd(true);
                }} >
                    Create Blog
                </button>
                <div className=" flex flex-wrap mt-10 gap-3">
                {myblogs.map((b)=>(
                    <>
                        
                            <BlogCard
                            id = {b._id}
                            date={b.date}
                            CardTitle={b.title}
                            author = {b.author}
                            CardDescription={truncateText(b.content, 200)}
                            image={`http://localhost:5400/uploads/${b.image}`}
                            />
                    
                    </>
                ))}
                </div>
            </div>

        )}
        {isauthenticated && add && (
            <div className = 'bg-white flex flex-col justify-center items-center h-screen'>
                <form onSubmit={handlesubmit} className="mt-6 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl space-y-5 animate-fadeIn w-200">
                <div>
                    <label className="block text-white font-semibold mb-1">Title</label>
                    <input
                    value = {newblog.title}
                    onChange  = {(e)=>{
                        setnewblog(prev => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }}
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-gray-800 placeholder-gray-600 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter blog title"
                    />
                </div>

                <div>
                    <label className="block text-white font-semibold mb-1">Upload Image</label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e)=>{
                        setimagePreview(true);
                        setImageFile(e.target.files[0])
                        setimgurl(URL.createObjectURL(e.target.files[0]))
                    }}
                    className="block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                    />
                    {imagePreview && (
                    <img
                        src={imgurl}
                        alt="Preview"
                        className="mt-3 w-full h-64 object-cover rounded-lg border border-white/30"
                    />
                    )}
                </div>

                <div>
                    <label className="block text-white font-semibold mb-1">Content</label>
                    <textarea
                    value = {newblog.content}
                    onChange  = {(e)=>{
                        setnewblog(prev => ({
                            ...prev,
                            content: e.target.value
                        }))
                    }}
                    rows="5"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-gray-800 placeholder-gray-600 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your blog content here..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-xl shadow mr-4"
                >
                    Submit Blog
                </button>
                <button
                    onClick = {()=>{
                        setadd(false);
                    }}
                    className="cursor-pointer bg-red-600 text-white px-6 py-2 rounded-xl shadow "
                >
                    Cancel
                </button>
                </form>
            </div>
        )}
    </>
  )
}

export default MyBlog