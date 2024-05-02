import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function GET(request:NextRequest){
    let decodedInfo= await getDataFromToken(request);

    if(decodedInfo!=="nothing"){
        let response= NextResponse.json({success: true ,data: decodedInfo});
        return response;
    } else{
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}