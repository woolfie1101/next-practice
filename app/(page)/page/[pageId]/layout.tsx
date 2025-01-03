import { PageNavbar } from "@/components/page/page-navbar";
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
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <PageNavbar page={page} progressCount={progressCount} />
      </div>
      <div className="hidden fixed md:flex h-full w-80 flex-col inset-y-0 z-50">
        <PagesSidebar page={page} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default PageLayout;
