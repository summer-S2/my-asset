import { useEffect, useState } from "react";
import type { HistoryData } from "../types/api";

import type {
  AccountType,
  BarGroupChartDataType,
  ChartDataType,
} from "../types/common";
import { ACCOUNT_TYPE } from "../utils/constants";

export const useAssetChartData = (data: HistoryData[] | null) => {
  const [chartData, setChartData] = useState<BarGroupChartDataType[]>([]);
  const [pieData, setPieData] = useState<ChartDataType[]>([]);

  useEffect(() => {
    if (data) {
      const grouped = data.reduce<Record<string, Record<AccountType, number>>>(
        (prev, cur) => {
          const month = cur.date.slice(0, 7);
          if (!prev[month]) prev[month] = {} as Record<AccountType, number>;
          if (!prev[month][cur.accountType]) prev[month][cur.accountType] = 0;

          prev[month][cur.accountType] += cur.amount;
          return prev;
        },
        {}
      );

      const monthlyList = Object.entries(grouped).map(([date, accountObj]) => ({
        date,
        ...ACCOUNT_TYPE.reduce((prev, key) => {
          prev[key] = accountObj[key] || 0;
          return prev;
        }, {} as Record<AccountType, number>),
      }));

      const donut = ACCOUNT_TYPE.map((key) => ({
        label: key,

        value: monthlyList.reduce(
          (sum, item) => sum + (item[key] as number),
          0
        ),
      }));

      setChartData(monthlyList.sort((a, b) => a.date.localeCompare(b.date)));
      setPieData(donut);
    }
  }, [data]);

  return { chartData, pieData };
};
