import React from 'react';
import signup from '../images/signup.png';
import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';


export default function Register() {
    const navigate = useNavigate();
    const [details,setDetails] = useState({username:"",email:"",password:""})
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/create",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username:details.username,email:details.email,password:details.password})
        });
        const json= await response.json();
        console.log(json);
        if(!json.success){
            alert("please enter valid credentials")
        }
        if(json.success){
            navigate("/login");
            alert("user register successfully")
        }
    }
    
    const onChange = (e) =>{
        setDetails({...details,[e.target.name]:e.target.value})
    }

  return (
    <div>
         <div className='m-4 signUp'>
            <div className='ml-20'>
                <h1 className='title font-bold text-4xl py-10'>LITTLE HEARTS</h1>
                <img src={signup} className='mt-0 ml-50 auth' height={300} width={300} />
            </div>
        <div className='form bg-white mt-6 ml-20 mb-4'>
        <h1 className='text-center font-bold text-4xl py-10'>Sign Up</h1>
            <form className='m-10 mt-0' onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="username">Username</label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input className='input' type="text" id="username" name="username" placeholder='enter your username' value={details.username} onChange={onChange} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email ID</label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input className='input' type="email" id="email" name="email" value={details.email} placeholder='enter your email' onChange={onChange}  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">Password</label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input className='input' type="password" id="password" name="password" value={details.password} placeholder='enter  password' onChange={onChange} />
                </div>
                <div style={{ marginBottom: '20px' }}>Already a user? <Link className='text-blue-500' to='/login'>Click here</Link> to login</div>
                <button className='mx-auto block register' type="submit">Sign Up</button>
            </form>
            </div>
        </div>
    </div>
  )
}
