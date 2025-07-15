import { useState } from "react";
import { PageLayout } from "../../components/layout/PageLayout";
import { useAccountData } from "../../hooks/useAccountData";
import { useMyassetStore } from "../../stores/myassetStore";
import { AddAccountModal } from "./components/AddAccountModal";
import { MyAccountTable } from "./components/MyAccountTable";
import { MyAssetChangeChart } from "./components/MyAssetChangeChart";
import { MyAssetDonutChart } from "./components/MyAssetDonutChart";

export const Home = () => {
  const { data } = useMyassetStore();
  const { accountData } = useAccountData(data);
  const [openAddModal, setOpenAddModal] = useState(false);

  // console.log(accountData);
  // console.log(data);

  // const result = accountData.map(({ histoty, ...rest }) => rest);
  // console.log("히스토리제외", result);

  return (
    <PageLayout>
      <div className="flex flex-col p-4 gap-8 w-full h-full">
        {/* 차트 영역 */}
        <div className="flex-grow flex justify-evenly flex-col lg:flex-row items-center">
          {/* 도넛차트 */}
          <MyAssetDonutChart data={data} />
          {/* 바차트 */}
          <MyAssetChangeChart data={data} />
        </div>

        {/* 테이블 영역 */}
        <div className="flex-grow">
          <MyAccountTable
            data={accountData}
            setOpenAddModal={setOpenAddModal}
          />
        </div>
      </div>

      {openAddModal && (
        <AddAccountModal open={openAddModal} setOpen={setOpenAddModal} />
      )}
    </PageLayout>
  );
};
