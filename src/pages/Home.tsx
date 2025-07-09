import { BarChart } from "../components/common/BarChart";
import { PieChart } from "../components/common/PieChart";
import { PageLayout } from "../components/layout/PageLayout";
import { useMyassetStore } from "../stores/myassetStore";

export const Home = () => {
  const { data } = useMyassetStore();

  console.log(data);

  return (
    <PageLayout>
      <div className="flex flex-col p-4 gap-8 w-full h-full">
        {/* 차트 영역 */}
        <div className="flex-grow flex gap-4">
          {/* 도넛차트 */}
          <PieChart data={data} />
          {/* 바차트 */}
          <BarChart data={data} />
        </div>

        {/* 테이블 영역 */}
        <div className="flex-grow"></div>
      </div>
    </PageLayout>
  );
};
