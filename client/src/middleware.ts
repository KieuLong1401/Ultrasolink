import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const middleware = (request: Request) => {
    const token = cookies().get('token')

    if (!token && request.url.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*'],
}
