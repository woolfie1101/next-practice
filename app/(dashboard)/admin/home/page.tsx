import { columns } from "@/components/dashboard/pages/column";
import { DataTable } from "@/components/dashboard/pages/data-table";
import { getPagesByCreator } from "@/data/page";

const AdminPage = async () => {
  const data = await getPagesByCreator();
  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminPage;
