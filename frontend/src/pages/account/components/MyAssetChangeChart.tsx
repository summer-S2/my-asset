import { Empty } from "antd";
import { BarChart } from "../../../components/common/BarChart";
import { Loader } from "../../../components/common/Loader";
import { SectionTitle } from "../../../components/common/SectionTitle";
import { useGetAccountHistoryAll } from "../../../hooks/useGetAccountHistoryAll";

export const MyAssetChangeChart = () => {
  const { data, isPending } = useGetAccountHistoryAll({});

  return (
    <div>
      <SectionTitle
        text="최근 6개월 자산 변동"
        withUserName
        classNames="py-4"
      />

      {isPending ? (
        <Loader />
      ) : data && data.result.list.length > 0 ? (
        <BarChart data={data?.result.list ?? []} />
      ) : (
        <div>
          <Empty description={`데이터가 없습니다.`} />
        </div>
      )}
    </div>
  );
};
