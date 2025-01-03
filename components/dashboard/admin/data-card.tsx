import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatWon } from "@/lib/format";

interface DataDardprops {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

export const DataCard = ({ value, label, shouldFormat }: DataDardprops) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xml font-bold">
          {shouldFormat ? formatWon(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};
