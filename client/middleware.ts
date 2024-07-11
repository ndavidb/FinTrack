import {NextResponse, NextRequest} from "next/server";

export function middleware(request: NextRequest) {

    const token = request.cookies.get('token')?.value;

    const { pathname } = request.nextUrl

    if (pathname.includes('/home') && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (pathname.includes('/portfolio') && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/home', request.url))
    }
    
    if (pathname === '/register' && token) {
        return NextResponse.redirect(new URL('/home', request.url))    
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/login', '/register', '/portfolio']
}


