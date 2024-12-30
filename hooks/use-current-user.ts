import { useSession } from "next-auth/react";
import { useEffect } from "react";

/*
 * Next.js 애플리케이션에서 현재 로그인한 사용자의 정보를 관리하는 커스텀 훅
 */

export const useCurrentUser = () => {
  const { data: session, status, update } = useSession();
  //data(session): 현재 세션 데이터 (로그인한 사용자 정보 포함)
  //status: 현재 인증 상태 ('authenticated', 'unauthenticated', 'loading' 중 하나)
  //update: 세션을 수동으로 업데이트할 수 있는 함수

  //사용자가 인증되지 않은 상태('unauthenticated')일 때 세션을 자동으로 업데이트
  //(세션이 만료되었거나 새로고침이 필요한 경우 사용)
  useEffect(() => {
    if (status === "unauthenticated") {
      update()
        .then(() => {})
        .catch(console.error);
    }
  }, [status, update]);

  //세션이 있다면 사용자 정보를 반환하고, 없다면 null을 반환
  return session?.user ?? null;
};
