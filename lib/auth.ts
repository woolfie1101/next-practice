import { auth } from "@/auth";

//서버사이드용 세션 정보를 가져온다.
export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};
