import { PageLayout } from "../components/layout/PageLayout";

export const Home = () => {
  return (
    <PageLayout>
      <div className="flex flex-col p-4 gap-8 w-full h-full">
        {/* 차트 영역 */}
        <div className="flex-grow"></div>

        {/* 테이블 영역 */}
        <div className="flex-grow"></div>
      </div>
    </PageLayout>
  );
};
