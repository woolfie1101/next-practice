import { PagesSidebar } from "@/components/page/page-sidebar";
import { getPageByPageId } from "@/data/page";
import { getProgress } from "@/data/progress";

const PageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ pageId: string }>;
}) => {
  const { pageId } = await params;
  const page = await getPageByPageId(pageId);
  const progressCount = await getProgress(pageId);

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-80 flex-col inset-y-0 z-50">
        <PagesSidebar page={page} progressCount={progressCount} />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
