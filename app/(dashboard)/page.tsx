// "use client";

// import { UserButton } from "@/components/auth/user-button";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();
//   const onClick = () => {
//     router.push("/login");
//   };
//   return (
//     <main className="flex h-full flex-col items-center justify-center">
//       <div className="space-y-6 text-center">
//         <h1 className=" text-6xl font-semibold drop-shadow-md">인증</h1>
//         <div>
//           <Button onClick={onClick} variant={"secondary"} size={"lg"}>
//             로그인
//           </Button>
//         </div>
//         <UserButton />
//       </div>
//     </main>
//   );
// }
import { PageList } from "@/components/dashboard/search/page-list";
import { InfoCard } from "@/components/info-card";
import { getDashboardPages } from "@/data/get-dashboard-pages";
import { CheckCircle, Clock } from "lucide-react";

const Dashboard = async () => {
  const { completedCourses, coursesInProgress } = await getDashboardPages()
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">        
        <InfoCard
          icon={Clock}
          label="진행중"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard 
          icon={CheckCircle}
          label="완료"
          numberOfItems={completedCourses.length}
        />
      </div>
      <PageList 
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  );
}

export default Dashboard