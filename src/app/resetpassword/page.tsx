"use client"
import React, {useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function ResetPassword() {
  let [newpassword, setNewPassword]= useState('');
  let [confirmpassword, setConfirmPassword]= useState('');
  let router= useRouter();

  const handleSubmit= async()=>{
    if(newpassword!==confirmpassword){
        alert("confirm password doesn't matches with new one");
    }else{
        let res= await axios.post('/api/users/resetpassword', {newpassword, confirmpassword});
        console.log(res.data);
        if(res.data.success===true){
            setNewPassword('');
            setConfirmPassword('');
            router.push('/login');
        }else{
            setNewPassword('');
            setConfirmPassword('');
            router.push('/forgetpassword');
        }
    }
  }
  return (
    <div className='h-[90vh]'>
        <div className='uppercase text-lg flex flex-col justify-center items-center gap-5 mt-20'>
            <input type="password" name="newpassword" id="newpass" className='text-center rounded-lg h-10 w-[15vw] bg-white' placeholder='new password' onChange={e=>setNewPassword(e.target.value)}/>
            <input type="password" name="confirmpassword" id="confirmpass" className='text-center rounded-lg h-10 w-[15vw] bg-white' placeholder='confirm password' onChange={e=>setConfirmPassword(e.target.value)}/>
            <input type="submit" value="reset" className='text-center rounded-lg h-10 w-[5vw] bg-amber-400' onClick={handleSubmit}/>
        </div>
    </div>
  )
}

export default ResetPassword