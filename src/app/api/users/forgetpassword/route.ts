import { NextRequest, NextResponse } from "next/server";
import user from "@/model/userModel";
import { forgetEmail } from "@/helper/forgetPasswordMail";
import connectDB from "@/dbConfig";

connectDB();

export async function POST(request: NextRequest){
    let body= await request.json();
    let {email}= body;
    let getUser= await user.findOne({email});
    if(!getUser){
        return NextResponse.json({
            message: "Invalid email address",
            success: false
        })
    }else{
        let token= await forgetEmail(getUser.email);
        let res= NextResponse.json({message: "Email sent successfully", success: true});
        res.cookies.set('resettoken', token, {httpOnly:true});
        return res;
    }
}