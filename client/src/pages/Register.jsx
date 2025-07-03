import React from 'react'
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'

function Register() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    
    const handlesubmit = async (e)=>{
        e.preventDefault();
        const payload = {
            name: name,
            email: email,
            password: password,
        }
        const response = await fetch('http://localhost:5400/api/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),

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
            }).then(()=>{
                window.location.href = '/login'
            })
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
  return (
    <div className="flex flex-col justify-center sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <h1 className ='mt-10 font-bold text-gray-800 text-2xl'>Get Started With Us</h1>
        </div>

        <form onSubmit = {handlesubmit}>
          <div className="space-y-6">
            <div>
              <label  className="text-slate-900 text-sm font-medium mb-2 block">Name</label>
              <input value = {name} onChange = {(e)=>{
                setname(e.target.value);
              }} type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Full Name" />
            </div>
            <div>
              <label  className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
              <input value = {email} onChange = {(e)=>{
                setemail(e.target.value);
              }} type="email" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Email" />
            </div>
            <div>
              <label  className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
              <input value = {password} onChange = {(e)=>{
                setpassword(e.target.value);
              }} type="password" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
            </div>
          </div>

          <div className="mt-12">
            <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
              Create an account
            </button>
          </div>
          <p className="text-slate-600 text-sm mt-6 text-center">Already have an account? <Link to = '/login' className="text-blue-600 font-medium hover:underline ml-1">Login here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register