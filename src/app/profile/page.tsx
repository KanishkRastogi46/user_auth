'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile(){
    let router= useRouter();

    let [id, setId]= useState('');

    const handleLogout= async ()=>{
        try {
            let res= await axios.get('/api/users/logout');
            router.push('/login');
        } catch (error) {
            console.log(error);
        }
    }

    const getId= async function(){
        try {
            let response= await axios.get('/api/users/id');
            console.log(response.data);
            setId(response.data.data.id)
            router.push(`/profile/${response.data.data.username}/`);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <div className="h-[90vh] text-center text-3xl">
                <div className="flex items-center uppercase gap-4">
                    <h1 className="uppercase">Profile :</h1><span className="font-semibold bg-orange-50">{id}</span>
                </div>
                <button type="submit" className="mt-1 p-2 uppercase bg-amber-400" onClick={getId}>Get Id</button>
                <button type="submit" className="uppercase rounded-lg text-lg text-center bg-amber-400 p-2 mt-2" onClick={()=>handleLogout()}>Logout</button>
            </div>
        </>
    )
}