import { Chart } from "@/components/dashboard/admin/chart";
import { DataCard } from "@/components/dashboard/admin/data-card";
import { getAnalytics } from "@/data/get-analytics";

const AnalyticsPage = async () => {
  const { data, totalRevenue, totalSales } = await getAnalytics();
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
