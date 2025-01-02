import { ItemAccessForm } from "@/components/dashboard/item/item-access-form";
import { ItemDescriptionForm } from "@/components/dashboard/item/item-description-form";
import { ItemTitleForm } from "@/components/dashboard/item/item-title-form";
import { IconBadge } from "@/components/icon-badge";
import { getItem } from "@/data/item";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    pageId: string;
    itemId: string;
  }>;
}

const ItemIdPage = async ({ params }: Props) => {
  const { pageId, itemId } = await params;
  const item = await getItem(pageId, itemId);

  if (!item) return redirect("/");

  const requiredFields = [item.title, item.description];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/admin/${pageId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> 강의 설정
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">아이템 생성</h1>
              <span className="text-sm text-slate-700">
                현재 : {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">챕터 구성</h2>
            </div>
            <ItemTitleForm initalData={item} pageId={pageId} itemId={itemId} />
            <ItemDescriptionForm
              initalData={item}
              pageId={pageId}
              itemId={itemId}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl">접근 설정</h2>
            </div>
            <ItemAccessForm initalData={item} pageId={pageId} itemId={itemId} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} />
            <h2 className="text-xl">오른쪽 공간 활용</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemIdPage;
