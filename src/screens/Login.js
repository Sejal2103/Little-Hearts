import React from 'react'
import {Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [details,setDetails] = useState({email:"",password:""})
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:details.email,password:details.password})
    });
    const json= await response.json();
    console.log(json);
    if(!json.success){
        alert("please enter valid credentials")
    }
    if(json.success){
        localStorage.setItem("userEmail",details.email);
        localStorage.setItem("accessToken",json.accessToken);
        console.log("accessToken")
        navigate("/home");
        alert("user logged in successfully")
    }
}

const onChange = (e) =>{
    setDetails({...details,[e.target.name]:e.target.value})
}

  return (
    <div>
       <div className='m-4 signUp'>
            <div className='d-flex flex-items-center justify-center ml-20'>
                <h1 className='title font-bold text-4xl py-10'>Welcome Back!</h1>
            </div>
        <div className='form bg-white mt-10 ml-20 mb-5 mr-10'>
        <h1 className='text-center font-bold text-4xl py-10'>Login</h1>
            <form className='m-10 mt-0' onSubmit={handleSubmit}>
                
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email ID</label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input className='input' type="email" id="email" name="email" value={details.email} placeholder='enter your email' onChange={onChange}  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">Password</label>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <input className='input' type="password" id="password" name="password" value={details.password} placeholder='enter  password' onChange={onChange} />
                </div>
                <div style={{ marginBottom: '20px' }}>Don't have an account? <Link className='text-blue-500' to='/signup'>Click here</Link> to create account</div>
                <button className='mx-auto block register' type="submit">Login</button>
            </form>
            </div>
        </div>
    </div>
  )
}
