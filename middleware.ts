import { NextRequest, NextResponse } from "next/server";
import {getToken} from 'next-auth/jwt'
import { AUTH_API_PREFIX, AUTH_ROUTES, PUBLIC_ROUTES } from "./route";


export async function middleware(req: NextRequest) {
    
    const {nextUrl} = req;

    const authToken = await getToken({req,secret:process.env.AUTH_SECRET || "QK3GhEGDarNrIscb8uRNBkSBzQxBvXXyB3MD8A333so="})

    const isApiAuthRoutes = req.nextUrl.pathname.startsWith(AUTH_API_PREFIX)

    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)

    const isPublicRoutes = PUBLIC_ROUTES.includes(nextUrl.pathname)

    if(isApiAuthRoutes) return null;

    if(isAuthRoute){
        if(authToken !== null){
            return NextResponse.redirect(new URL('/', nextUrl))
        }
        return null;
    }

    if(authToken === null && !isPublicRoutes){
        return NextResponse.redirect(new URL('/auth/sign-in', nextUrl))
    }
    return null;
}


export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
