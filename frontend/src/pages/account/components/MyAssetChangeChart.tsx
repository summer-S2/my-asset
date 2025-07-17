import { Empty } from "antd";
import { BarChart } from "../../../components/common/BarChart";
import { Loader } from "../../../components/common/Loader";
import { SectionTitle } from "../../../components/common/SectionTitle";
import type { HistoryData } from "../../../types/api";

interface Props {
  data: HistoryData[] | null;
  isLoading?: boolean;
}

export const MyAssetChangeChart = ({ data, isLoading }: Props) => {
  return (
    <div>
      <SectionTitle
        text="최근 6개월 자산 변동"
        withUserName
        classNames="py-4"
      />

      {isLoading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        <BarChart data={data} />
      ) : (
        <div>
          <Empty description={`데이터가 없습니다.`} />
        </div>
      )}
    </div>
  );
};
