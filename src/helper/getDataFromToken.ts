import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
    let token= request.cookies.get('token')?.value || "";
    
    if(token){
        let userDetails= await jwt.verify(token, process.env.JWT_SECRET_KEY!);
        return userDetails;
    } else{
        return "nothing";
    }
}