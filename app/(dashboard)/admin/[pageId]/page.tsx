import { Banner } from "@/components/banner";
import { ItemsForm } from "@/components/dashboard/admin/item-form";
import { PageActions } from "@/components/dashboard/admin/page-actions";
import { TitleForm } from "@/components/dashboard/admin/title-form";
import { CategoryForm } from "@/components/dashboard/course/category-form";
import { ImageForm } from "@/components/dashboard/course/image-form";
import { PriceForm } from "@/components/dashboard/course/price-form";
import { DescriptionForm } from "@/components/dashboard/description-form";
import { IconBadge } from "@/components/icon-badge";
import { getPage } from "@/data/admin";
import { getCategories } from "@/data/category";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
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

  const categories = await getCategories();

  const requiredFields = [
    page?.title,
    page?.description,
    page?.imageUrl,
    page?.price,
    page?.categoryId,
    page.items.some((item) => item.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!page.isPublished && (
        <Banner label="비공개 페이지입니다. 사람들에게 보이지 않습니다." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">설정</h1>
            <span className="text-sm text-slate-700">
              지금까지 {completionText}
            </span>
          </div>
          <PageActions
            disabled={!isComplete}
            pageId={page.id}
            isPublished={page.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">설정하세요</h2>
            </div>
            <TitleForm initalData={page} pageId={page.id} />
            <DescriptionForm initalData={page} pageId={page.id} />
            <ImageForm initalData={page} pageId={page.id} />
            <CategoryForm
              initalData={page}
              pageId={page.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          {/* 2 bit columns */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">아이템</h2>
              </div>
              <ItemsForm initalData={page} pageId={page.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">가격</h2>
              </div>
              <PriceForm initalData={page} pageId={page.id} />
            </div>
          </div>
          {/* 2 bit columns end */}
        </div>
      </div>
    </>
  );
};

export default PageIdPage;
