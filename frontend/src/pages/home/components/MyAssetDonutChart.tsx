import { Loader } from "../../../components/common/Loader";
import { PieChart } from "../../../components/common/PieChart";
import { SectionTitle } from "../../../components/common/SectionTitle";
import type { HistoryData } from "../../../types/api";

interface Props {
  data: HistoryData[] | null;
  isLoading?: boolean;
}

export const MyAssetDonutChart = ({ data, isLoading }: Props) => {
  return (
    <div>
      <SectionTitle text="자산 현황" withUserName classNames="py-4" />

      {isLoading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        <PieChart data={data} />
      ) : (
        <div>데이터가 없습니다..</div>
      )}
    </div>
  );
};
