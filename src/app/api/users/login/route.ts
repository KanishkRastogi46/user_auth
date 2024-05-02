import connectDB from "@/dbConfig/index";
import user from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request:NextRequest) {
    let reqBody= await request.json();
    let {username, password}= reqBody;

    let getUser= await user.findOne({username});
    
    if(!getUser){
        return NextResponse.json({msg: "Invalid user details", success: false})
    }
    
    let isCorrect= await bcryptjs.compare(password, getUser.password);
    
    if(isCorrect){
        let tokenData= {
            id: getUser._id,
            username: getUser.username,
            email: getUser.email
        }
        let token= await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: '1d'})

        let response= NextResponse.json({
            message: "Login Successfull",
            success: true
        });
        response.cookies.set('token', token, {
            httpOnly: true,
        })
        return response;
    }else{
        return NextResponse.json({msg: "Invalid Password", success: false});
    }
}