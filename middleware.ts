import { NextRequest } from "next/server";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";


const { auth } = NextAuth(authConfig); //NextAuth의 설정을 불러와 인증기능을 초기화

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export default auth(async function middleware(req: NextRequest) {
  const { nextUrl } = req; 
  /*
  * 미들웨어 함수는 모든 요청(req)을 받아 처리한다. 
  * nextUrl은 현재 요청된 URL 정보를 담고있다. 
  */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const isLoggedIn = !!req.auth; //사용자의 인증 상태를 확인

  //경로 검사 로직
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix); //API 인증 관련 경로 (ex. /api/auth/...)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname); //공개 접근 가능한 경로
  const isAuthRoute = authRoutes.includes(nextUrl.pathname); //인증 관련 경로 (로그인, 회원가입 등)

  //접근 제어 로직

  if (isApiAuthRoute) { //API 인증 경로는 
    return null;
  }

  // 인증 관련 페이지
  if (isAuthRoute) {
    // 이미 로그인인데 인증 페이지로 접근하는 경우 첫 페이지로
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // 로그인 하지 않았는데 Public 허용도 아닌경우
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    "/",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
