"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // 로그아웃 전에 체크 로직 등을 넣고 싶은 경우
  await signOut({redirectTo:"/login", redirect: true})
}

// "use server";

// import { signOut } from "@/auth";
// import { redirect } from "next/navigation";

// export const logout = async () => {
//   try {
//     // 먼저 로그아웃 처리를 합니다
//     await signOut();
    
//     // 그 다음 리다이렉션을 수행합니다
//     redirect("/login");
//   } catch (error) {
//     // NEXT_REDIRECT 에러는 정상적인 리다이렉션 프로세스의 일부이므로
//     // 실제 에러가 아닌 경우는 무시합니다
//     if (error instanceof Error && !error.message.includes("NEXT_REDIRECT")) {
//       console.error("로그아웃 중 오류 발생:", error);
//       throw error;
//     }
//   }
// };