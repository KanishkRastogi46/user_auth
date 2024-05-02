import { NextResponse } from "next/server";

export async function GET() {
    try {
        let response= NextResponse.json({});
        response.cookies.delete('token');
        return response;
    } catch (error) {
        console.log(error)
    }
}