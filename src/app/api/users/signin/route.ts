import connectDB from "@/dbConfig/index";
import user from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";


connectDB()

export async function POST(request: NextRequest){
    try {
        let reqBody= await request.json();
        let {username, email, password}= reqBody;

        let getuser= await user.findOne({username});
        if(getuser){
            return NextResponse.json({error: "User already exists"})
        }
        let salt= await bcryptjs.genSalt(10);
        let hashedPassword= await bcryptjs.hash(password, salt);

        let createuser= new user({username, email, password: hashedPassword});

        let userCreated= await createuser.save();

        //send email
        await sendEmail({email, emailType: 'VERIFY', userId: userCreated._id});
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            data: userCreated
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message, status: 500})
    }
}