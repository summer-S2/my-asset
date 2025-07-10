import { PageLayout } from "../../components/layout/PageLayout";
import { useAccountData } from "../../hooks/useAccountData";
import { useMyassetStore } from "../../stores/myassetStore";
import { MyAccountTable } from "./components/MyAccountTable";
import { MyAssetChangeChart } from "./components/MyAssetChangeChart";
import { MyAssetDonutChart } from "./components/MyAssetDonutChart";

export const Home = () => {
  const { data } = useMyassetStore();
  const { accountData } = useAccountData(data);

  // console.log(accountData);

  return (
    <PageLayout>
      <div className="flex flex-col p-4 gap-8 w-full h-full">
        {/* 차트 영역 */}
        <div className="flex-grow flex gap-8 justify-center">
          {/* 도넛차트 */}
          <MyAssetDonutChart data={data} />
          {/* 바차트 */}
          <MyAssetChangeChart data={data} />
        </div>

        {/* 테이블 영역 */}
        <div className="flex-grow">
          <MyAccountTable data={accountData} />
        </div>
      </div>
    </PageLayout>
  );
};
