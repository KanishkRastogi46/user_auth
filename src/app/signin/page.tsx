'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Signup() {
  let router= useRouter();
  let [user, setUser]= useState({
    username: "",
    email: "",
    password: ""
  });
  let [disabled, setDisabled]= useState(false);
  let [loading, setLoading]= useState(false);
  
  useEffect(()=>{
    if(user.email.trim()==="" || user.username.trim()==="" || user.password.trim()===""){
        setDisabled(true);
    }else{
        setDisabled(false);
    }
  },[user])

  const handleSubmit= async()=>{
    try {
        setLoading(true);
        let res= await axios.post('/api/users/signin', user);
        console.log(res.data);
        router.push('/login');
    } catch (error:any) {
        console.log(error);
    } finally{
        setLoading(false);
    }
  }

  return (
    <>
        <div className='w-full h-[90vh] flex justify-center items-center flex-col'>
            <div className="text-center text-2xl uppercase m-10">
                <h1>{loading ? "PROCESSING..." : "SIGN IN"}</h1>
            </div>
        <div className='size-1/2 flex flex-col items-center gap-5'>
            <input type="text" className='rounded-lg w-1/3 h-10 text-md text-center text-slate-800' name="username" id="username" placeholder='USERNAME' onChange={(e)=>{
                setUser((prev)=>{
                    return {...prev, username: e.target.value}
                })
            }}/>
            <input type="email" className='rounded-lg w-1/3 h-10 text-md text-center text-slate-800' name="email" id="email" placeholder='EMAIL' onChange={(e)=>{
                setUser((prev)=>{
                    return {...prev, email: e.target.value}
                })
            }}/>
            <input type="password" className='rounded-lg w-1/3 h-10 text-md text-center text-slate-800' name="password" id="password" placeholder='PASSWORD' onChange={(e)=>{
                setUser((prev)=>{
                    return {...prev, password: e.target.value}
                })
            }}/>
            <input type="submit" className='rounded-lg w-1/5 h-8 text-md bg-amber-400 text-center text-slate-950 font-semibold' value={disabled ? "NO SIGNIN" : "SIGN IN"} onClick={()=>handleSubmit()} />
        </div>
        </div>
    </>
  )
}

export default Signup;