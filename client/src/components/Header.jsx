import React from 'react'
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {User} from 'lucide-react';

function Header() {
    const [isloggedin, setisloggedin] = useState(false);
    const [user, setuser] = useState({});

    const checkauth = async ()=>{
        const response = await fetch('http://localhost:5400/api/checkauth', {
            method: 'GET',
            credentials: 'include',
        })
        const result = await response.json();
        if(result.success){
            setisloggedin(true);
            setuser(result.user);

        }
    }
    useEffect(()=>{
        checkauth();
    }, [])
  return (
    <>
        {!isloggedin && (
            <nav className = ' p-5 w-300 mx-auto mt-6 rounded-3xl backdrop-blur-md bg-white/10 border border-white/30 shadow-md'>
                <div className = "max-w-6xl mx-auto px-2 flex justify-between items-center">
                    <h2 className = 'text-2xl font-semibold text-gray-700'>Blogify</h2>
                    <div className = 'flex gap-8'>
                        <Link to = '/' className = 'text-blue-500'>Home</Link>
                        <Link to = '/'>About</Link>
                        <Link to = '/'>Github</Link>
                    </div>
                    <div className = 'flex gap-5'>
                        <Link to = '/login'><button className = 'px-3 py-1.5 bg-blue-700 text-gray-50 rounded-md cursor-pointer'>Login</button></Link>
                        <Link to = '/register'><button className = 'px-3 py-1.5 bg-blue-700 text-gray-50 rounded-md cursor-pointer'>Register</button></Link>
                    </div>
                </div>
            </nav>
        )}
        {isloggedin && (
            <nav className = ' p-5 w-300 mx-auto mt-6 rounded-3xl backdrop-blur-md bg-white/10 border border-white/30 shadow-md'>
                <div className = "max-w-6xl mx-auto px-2 flex justify-between items-center">
                    <h2 className = 'text-2xl font-semibold text-gray-700'>Blogify</h2>
                    <div className = 'flex gap-8'>
                        <Link to = '/' className = 'text-blue-500'>Home</Link>
                        <Link to = '/'>About</Link>
                        <Link to = '/'>Github</Link>
                    </div>
                    <div className = 'flex gap-5 items-center'>
                        <div className = 'rounded-full bg-gray-600 py-1.5 px-1.5'>
                            <User className = 'text-white'/>
                        </div>
                        <p>{user.name}</p>
                    </div>
                </div>
            </nav>
        )}
    </>
  )
}

export default Header