import { Empty } from "antd";
import { Loader } from "../../../components/common/Loader";
import { PieChart } from "../../../components/common/PieChart";
import { SectionTitle } from "../../../components/common/SectionTitle";
import { useGetAccount } from "../../../hooks/useGetAccount";

export const MyAssetDonutChart = () => {
  const { data, isPending } = useGetAccount({});

  return (
    <div>
      <SectionTitle text="자산 현황" withUserName classNames="py-4" />

      {isPending ? (
        <Loader />
      ) : data && data.result.list.length > 0 ? (
        <PieChart data={data?.result.list ?? []} />
      ) : (
        <div>
          <Empty description={`데이터가 없습니다.`} />
        </div>
      )}
    </div>
  );
};
