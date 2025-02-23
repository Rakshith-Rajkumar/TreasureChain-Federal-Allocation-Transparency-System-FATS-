// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

const generateDeviceFingerprint = (request: NextRequest) => {
  const headers = {
    'user-agent': request.headers.get('user-agent') || '',
    'accept-language': request.headers.get('accept-language') || '',
  };
  return Buffer.from(JSON.stringify(headers)).toString('base64');
};

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getSession(request, response);
  const fingerprint = generateDeviceFingerprint(request);

  if (session?.user) {
    response.cookies.set('device-fingerprint', fingerprint, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  if (request.nextUrl.pathname.startsWith('/dashboard') && !session?.user) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|org-error).*)',
    '/dashboard/:path*',
  ],
};
