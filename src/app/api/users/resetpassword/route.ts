import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import user from "@/model/userModel";
import connectDB from "@/dbConfig";

connectDB();

export async function POST(request: NextRequest){
   try {
    let body= await request.json();
    console.log(body);
    let {newpassword, confirmpassword}= body;
    let resetToken= request.cookies.get('resettoken')?.value || "";
    let getUser= await user.findOne({forgetPasswordToken: resetToken, forgetPasswordExpiry: {$gt: Date.now()}});
    console.log(getUser);
    if(getUser){
        let hashedPassword= await bcryptjs.hash(newpassword, 10);
        getUser.password= hashedPassword;
        getUser.forgetPasswordToken= undefined;
        getUser.forgetPasswordExpiry= undefined;
        await getUser.save();
        let res= NextResponse.json({message: "Password changed successfully", success: true});
        res.cookies.delete('resettoken');
        return res;
    }else{
        return NextResponse.json({message: "unsuccessfull attempt", success: true});
    }
   } catch (error) {
    return error;
   }
}