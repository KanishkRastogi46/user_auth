'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  let router= useRouter();
  let [email, setEmail]= useState("");
  let [forget, setForget]= useState(false);
  //let [send, setSend]= useState(false);

  const handleSubmit= async()=>{
    let res= await axios.post('/api/users/forgetpassword', {email});
    console.log(res.data);
    if(res.data.success===false){
      router.push('/forgetpassword');
    }else{
      setForget(true);
      setEmail('');
    }
  }

  return (
    <>
    {!forget ? <div className='h-[90vh] text-center uppercase text-lg'>
        <h1 className='m-10 uppercase'>enter your email</h1>
        <div className="m-20 flex flex-col gap-8 justify-center items-center">
            <input type="email" name="email" id="email" className='w-[15vw] h-10 rounded-lg bg-white p-2' onChange={e=>setEmail(e.target.value)}/>
            <input type="submit" value="send" className='uppercase h-10 w-[5vw] rounded-lg bg-amber-400 text-center' onClick={handleSubmit}/>
        </div>
    </div>: <div className='h-[90vh] text-center uppercase text-lg'>
      <h1>Check email to reset your password</h1>
      </div>}
    </>
  )
}