import { getPageByPageId } from "@/data/page";
import { redirect } from "next/navigation";

const PageIdPage = async ({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) => {
  const { pageId } = await params;
  const page = await getPageByPageId(pageId);

  return redirect(`/page/${page.id}/item/${page.items[0].id}`);
};

export default PageIdPage;
