import React from 'react'
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'

function Login() {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');


  const handlesubmit = async (e)=>{
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    }
    const response = await fetch('http://localhost:5400/api/login', {
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
      window.location.href = '/'
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
    <div class="bg-gray-50">
      <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div class="max-w-[480px] w-full">
          <a href="javascript:void(0)"><img
            src="https://readymadeui.com/readymadeui.svg" alt="logo" class="w-40 mb-8 mx-auto block" />
          </a>

          <div class="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 class="text-slate-900 text-center text-3xl font-semibold">Sign in</h1>
            <form class="mt-12 space-y-6" onSubmit = {handlesubmit}>
              <div>
                <label class="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                <div class="relative flex items-center">
                  <input value = {email} onChange={(e)=>{
                    setemail(e.target.value);
                  }} type="email" required class="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter Email" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              <div>
                <label class="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                <div class="relative flex items-center">
                  <input value = {password} onChange={(e)=>{
                    setpassword(e.target.value);
                  }} type="password" required class="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="text-sm">
                  <a href="jajvascript:void(0);" class="text-blue-600 hover:underline font-semibold">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div class="!mt-12">
                <button type="submit" class="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                  Sign in
                </button>
              </div>
              <p class="text-slate-900 text-sm !mt-6 text-center">Don't have an account? <Link to = '/register' class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login