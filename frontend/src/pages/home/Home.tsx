import { useState } from "react";
import { PageLayout } from "../../components/layout/PageLayout";
import { useMyassetStore } from "../../stores/myassetStore";
import { AddAccountModal } from "./components/AddAccountModal";
import { MyAccountTable } from "./components/MyAccountTable";
import { MyAssetChangeChart } from "./components/MyAssetChangeChart";
import { MyAssetDonutChart } from "./components/MyAssetDonutChart";

export const Home = () => {
  const { data: fakeData } = useMyassetStore();

  const [openAddModal, setOpenAddModal] = useState(false);

  // console.log(account);
  // console.log(accountData);
  // console.log(data);

  // const result = accountData.map(({ histoty, ...rest }) => rest);
  // console.log("히스토리제외", result);

  // console.log(getAccountList(34, 1));
  // console.log(getAcccountHistory(100, 2));

  return (
    <PageLayout>
      <div className="flex flex-col p-4 gap-8 w-full h-full">
        {/* 차트 영역 */}
        <div className="flex justify-evenly flex-col lg:flex-row items-center min-h-[460px]">
          {/* 도넛차트 */}
          <MyAssetDonutChart data={fakeData} />
          {/* 바차트 */}
          <MyAssetChangeChart data={fakeData} />
        </div>

        {/* 테이블 영역 */}
        <div className="flex-grow">
          <MyAccountTable
            // data={data?.result.list}
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
