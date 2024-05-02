import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig";
import user from "@/model/userModel";

connectDB();

export async function POST(request: NextRequest){
    try{
        let reqBody= await request.json();
        let {token}= reqBody;

        let getUser= await user.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        
        if(!getUser){
            return NextResponse.json({error: "Invalid token", status: 500, success: false});
        }

        getUser.isVerified= true;
        getUser.verifyToken= undefined;
        getUser.verifyTokenExpiry= undefined;
        await getUser.save();

        return NextResponse.json({
            message: "Email Verification successful",
            success: true
        })
    } catch(error){
        console.log(error);
    }
}