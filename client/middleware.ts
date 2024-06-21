import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
import {parseCookies} from "nookies";

export function middleware(request: NextRequest) {

    const token = request.cookies.get('token')?.value;

    const { pathname } = request.nextUrl

    if (pathname.includes('/home') && !token) {
        // Redirect to login if no token is found
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathname === '/login' && token) {
        // Redirect to homepage if user is already logged in
        return NextResponse.redirect(new URL('/home', request.url))
    }
    
    if (pathname === '/register' && token) {
        return NextResponse.redirect(new URL('/home', request.url))    
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/login', '/register']
}


