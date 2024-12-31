import { TitleForm } from "@/components/dashboard/admin/title-form";
import { DescriptionForm } from "@/components/dashboard/description-form";
import { IconBadge } from "@/components/icon-badge";
import { getPage } from "@/data/admin";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ pageId: string }>;
}

const PageIdPage = async ({ params }: Props) => {
  const { pageId } = await params;
  const page = await getPage(pageId);

  if (!page) {
    redirect("/admin");
  }

  const requiredFields = [
    page?.title,
    page?.description,
    page?.imageUrl,
    page?.price,
    page?.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">설정</h1>
          <span className="text-sm text-slate-700">
            지금까지 {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">설정하세요</h2>
          </div>
          <TitleForm initalData={page} pageId={page.id} />
          <DescriptionForm initalData={page} pageId={page.id} />
        </div>
      </div>
    </div>
  );
};

export default PageIdPage;
