import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './services/AuthService';

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ['/login', '/register'];

const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/, /^\/profile/],
  admin: [/^\/admin/, /^\/profile/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname, origin } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(`${origin}/login?redirectPath=${pathname}`);
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some(route => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL('/', request.url));
};

export const config = {
  matcher: [
    '/login',
    '/register',
    '/create-shop',
    '/admin',
    '/admin/:page',
    '/user',
    '/user/:page',
    '/profile',
  ],
};
