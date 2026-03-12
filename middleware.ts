// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  // 토큰이 없는데 로그인 페이지가 아닌 곳(보호 라우트)을 가려고 할 때
  if (!accessToken && !isLoginPage) {
    // 리프레시 토큰이라도 있으면 진입 허용 (클라이언트 apiClient가 처리하도록)
    if (refreshToken) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 토큰이 있는데 로그인 페이지를 가려고 하면 대시보드로 튕겨냄!
  if (accessToken && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 감시할 경로 설정 (api, 정적 파일, 이미지 등은 제외)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)).*)'],
};