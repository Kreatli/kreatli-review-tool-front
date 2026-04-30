import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (request.nextUrl.pathname === '/account' || request.nextUrl.pathname.startsWith('/account/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export const config = {
  matcher: ['/account', '/account/:path*'],
};
