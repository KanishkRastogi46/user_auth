'use client'
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail(){
    let params= useSearchParams();
    let [verified, setVerified]= useState(false);

    useEffect(()=>{
        axios.post('/api/users/verifyemail', {token: params.get('token')})
        .then((res)=>{
            console.log(res.data);
            if(res.data.success===true){
                setVerified(true)
            }
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return <>
        <div className="uppercase flex items-center justify-center text-2xl h-[90vh]">
            <h1>{verified ? "verfied..." : "not verfied ..."}</h1>
        </div>
    </>
}