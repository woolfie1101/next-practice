"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const onClick = () => {
    router.push("/login");
  }
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className=" text-6xl font-semibold drop-shadow-md">
          인증
        </h1>        
        <div>
          <Button onClick={onClick} variant={"secondary"} size={"lg"}>
            로그인
          </Button>
        </div>
      </div>
    </main>
  );
}