import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;

    const isPublicPath = pathname === '/login' || pathname === '/signup' ;

    const token = request.cookies.get('token')?.value;
    /* console.log(token) */

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }



  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    '/',
    '/login',
    '/signup',
    '/profile',
  ]
}