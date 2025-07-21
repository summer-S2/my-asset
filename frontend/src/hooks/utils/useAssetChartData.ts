import { useEffect, useState } from "react";
import type { Account, History } from "../../types/api";
import type { BarGroupChartDataType, ChartDataType } from "../../types/common";
import { ACCOUNT_TYPE_MAP } from "../../utils/constants";

interface Props {
  historyData: History[] | null;
  accountData: Account[] | null;
}

export const useAssetChartData = ({ historyData, accountData }: Props) => {
  const [chartData, setChartData] = useState<BarGroupChartDataType[]>([]);
  const [pieData, setPieData] = useState<ChartDataType[]>([]);

  // 히스토리 기반 막대차트 데이터 계산
  useEffect(() => {
    if (historyData) {
      const grouped = historyData.reduce<
        Record<string, Record<number, number>>
      >((prev, cur) => {
        const month = cur.transaction_date.slice(0, 7);
        const type = cur.account_type;
        const sign = cur.transaction_type === "DEPOSIT" ? 1 : -1;

        if (!prev[month]) prev[month] = {};
        if (!prev[month][type]) prev[month][type] = 0;

        prev[month][type] += sign * cur.amount;
        return prev;
      }, {});

      const monthlyList = Object.entries(grouped).map(([date, accountObj]) => {
        const row: any = { date };

        Object.keys(ACCOUNT_TYPE_MAP).forEach((key) => {
          const type = Number(key);
          row[type] = accountObj[type] || 0;
        });

        return row;
      });

      setChartData(monthlyList.sort((a, b) => a.date.localeCompare(b.date)));
    }
  }, [historyData]);

  //  계좌 기반 파이차트 데이터 계산
  useEffect(() => {
    if (accountData) {
      const sumByType = accountData.reduce<Record<number, number>>(
        (acc, cur) => {
          if (!acc[cur.account_type]) acc[cur.account_type] = 0;
          acc[cur.account_type] += cur.balance;
          return acc;
        },
        {}
      );

      const donut = Object.entries(ACCOUNT_TYPE_MAP).map(([key, label]) => {
        const type = Number(key);
        return {
          label,
          value: sumByType[type] || 0,
        };
      });

      setPieData(donut);
    }
  }, [accountData]);

  // console.log("막대차트 데이터", chartData);
  // console.log("도넛차트 데이터", pieData);

  return { chartData, pieData };
};
