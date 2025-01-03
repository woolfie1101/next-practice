import { Banner } from "@/components/banner";
import { getPageForUser } from "@/data/page";

const ItemIdPage = async ({
  params,
}: {
  params: Promise<{
    pageId: string;
    itemId: string;
  }>;
}) => {
  const { pageId, itemId } = await params;
  const { item, page, nextItem, userProgress, purchase } = await getPageForUser(
    pageId,
    itemId
  );

  const isLocked = !item.isFree && !purchase;

  const completeOnEnd = !!purchase && !userProgress?.isComplete;

  return (
    <div>
      {userProgress?.isComplete && (
        <Banner variant="success" label="이미 완료했습니다." />
      )}
      {isLocked && <Banner variant="warning" label="접근할 수 없습니다" />}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">디테일 더 꾸미기</div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-center">
          <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
          {purchase ? (
            <div></div>
          ) : (
            // 진행상태
            <div></div>
            // 신청버튼
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemIdPage;
