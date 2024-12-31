import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="p-6">
      <Link href="/admin/create">
        <Button>생성</Button>
      </Link>
    </div>
  );
};

export default AdminPage;
