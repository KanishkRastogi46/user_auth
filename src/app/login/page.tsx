"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';


function Login() {
  let router= useRouter();
  let [user, setUser]= useState({
    username: "",
    password: ""
  });
  let [disabled, setDisabled]= useState(false);
  let [loading, setLoading]= useState(false);
  
  useEffect(()=>{
    if(user.username.trim()==="" || user.password.trim()===""){
        setDisabled(true);
    }else{
        setDisabled(false);
    }
  },[user]);

  let handleSubmit= async()=>{
    try{
        setLoading(true);
        let response= await axios.post('/api/users/login', user);
        console.log(response.data);
        if(response.data.success===true){
            router.push('/profile');
        }else{
            router.push('/login');
        }
    }catch(error){
        console.log(error);
    } finally{
        setLoading(false);
    }
  }

  return (
    <>
        <div className='w-full h-[90vh] flex justify-center items-center flex-col'>
            <div className="text-center text-2xl uppercase m-10">
                <h1>{loading ? "processing..." : "login"}</h1>
            </div>
        <div className='size-1/2 flex flex-col items-center gap-5'>
            <input type="text" className='rounded-lg w-1/3 h-10 text-md text-center text-slate-800' name="username" id="username" placeholder='USERNAME' onChange={(e)=>{
                setUser((prev)=>{
                    return {...prev, username: e.target.value}
                })
            }}/>
            
            <input type="password" className='rounded-lg w-1/3 h-10 text-md text-center text-slate-800' name="password" id="password" placeholder='PASSWORD' onChange={(e)=>{
                setUser((prev)=>{
                    return {...prev, password: e.target.value}
                })
            }}/>
            <input type="submit" className='rounded-lg w-1/5 h-8 text-md bg-amber-400 text-center text-slate-950 font-semibold' value={disabled ? "NO LOGIN" : "LOGIN"}  onClick={()=>handleSubmit()}/>
        </div>
        <div className='text-1xl underline text-cyan-50 uppercase'><Link href={'/forgetpassword'}>forget password</Link></div>
        </div>
    </>
  )
}

export default Login;