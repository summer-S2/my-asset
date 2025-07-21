import { useGetAccount } from "../../../hooks/useGetAccount";
import { useAssetChartData } from "../../../hooks/utils/useAssetChartData";
import { Loader } from "../../../components/common/Loader";
import { Empty, List } from "antd";
import { SectionTitle } from "../../../components/common/SectionTitle";
import { useEffect, useState } from "react";
import type { Account } from "../../../types/api";
import { formatKoreanCurrency } from "../../../utils/fn";

export const SummaryCard = () => {
  const [accountData, setAccountData] = useState<Account[]>([]);
  const { data, isPending } = useGetAccount({});

  useEffect(() => {
    if (data && data.result.list.length > 0) {
      setAccountData(data.result.list);
    }
  }, [data]);

  const { pieData } = useAssetChartData({
    accountData: accountData,
    historyData: null,
  });

  return (
    <div className="h-[320px] flex w-full flex-col p-4">
      <SectionTitle withUserName text="자산 요약" classNames="justify-start" />

      {isPending ? (
        <Loader />
      ) : data && data.result.list.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={pieData}
          renderItem={(item) => (
            <List.Item style={{ padding: "8px" }}>
              <List.Item.Meta
                avatar={<div className="w-full h-[48px] flex-center">💰</div>}
                title={<div className="font-semibold">{item.label}</div>}
                description={
                  <div className="text-black font-semibold text-md">
                    {formatKoreanCurrency(item.value)}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <div className="flex-grow flex-center">
          <Empty
            description={`자산 정보가 없습니다. \n계좌 정보를 추가해 주세요.`}
          />
        </div>
      )}
    </div>
  );
};
