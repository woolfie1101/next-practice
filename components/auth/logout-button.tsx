"use client";

import { logout } from "@/actions/auth/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
  const onClick = () => {
    logout()
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}      
    </span>
  )
}

// "use client";

// import { logout } from "@/actions/auth/logout";
// import { useRouter } from "next/navigation";

// interface LogoutButtonProps {
//   children?: React.ReactNode;
// }

// export const LogoutButton = ({ children }: LogoutButtonProps) => {
//   const router = useRouter();

//   const onClick = async (e: React.MouseEvent) => {
//     e.preventDefault(); // 기본 이벤트 동작을 막습니다.
    
//     try {
//       // 로그아웃 서버 액션을 호출합니다.
//       await logout();
      
//       // 서버 액션의 리다이렉트가 실패할 경우를 대비해
//       // 클라이언트 측에서도 리다이렉트를 시도합니다.
//       router.push("/login");
//       router.refresh(); // 페이지를 새로고침하여 상태를 업데이트합니다.
//     } catch (error) {
//       console.error("로그아웃 처리 중 오류:", error);
//       // 여기서 에러 처리를 할 수 있습니다 (예: 토스트 메시지 표시)
//     }
//   };

//   return (
//     <span onClick={onClick} className="cursor-pointer w-full">
//       {children}
//     </span>
//   );
// };