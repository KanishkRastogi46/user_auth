import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let path= request.nextUrl.pathname;
    let isPublic= path==="/signin" || path==="/login" || path==="/verifyemail";
    let resetPath= path==="/resetpassword";

    let token= request.cookies.get('token')?.value || "";
    let resettoken= request.cookies.get('resettoken')?.value || "";

    if(resetPath && resettoken){
      return NextResponse.next();
    } else if(resetPath && !resettoken){
      return NextResponse.redirect(new URL('/forgetpassword', request.nextUrl));
    }

    if(!isPublic && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }else if(!isPublic && token){
        return NextResponse.next();
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/profile',
    '/login',
    '/signin',
    '/verifyemail',
    '/resetpassword'
  ]
}