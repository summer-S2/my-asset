import { BarChart } from "../../../components/common/BarChart";
import { Loader } from "../../../components/common/Loader";
import type { HistoryData } from "../../../types/api";

interface Props {
  data: HistoryData[] | null;
  isLoading?: boolean;
}

export const MyAssetChangeChart = ({ data, isLoading }: Props) => {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        <BarChart data={data} />
      ) : (
        <div>데이터가 없습니다..</div>
      )}
    </div>
  );
};
