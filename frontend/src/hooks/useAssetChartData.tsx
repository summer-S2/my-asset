import { useEffect, useState } from "react";
import type { History } from "../types/api";
import type { BarGroupChartDataType, ChartDataType } from "../types/common";
import { ACCOUNT_TYPE_MAP } from "../utils/constants";

export const useAssetChartData = (data: History[] | null) => {
  const [chartData, setChartData] = useState<BarGroupChartDataType[]>([]);
  const [pieData, setPieData] = useState<ChartDataType[]>([]);

  // console.log(chartData);
  // console.log(pieData);

  useEffect(() => {
    if (data) {
      const grouped = data.reduce<Record<string, Record<number, number>>>(
        (prev, cur) => {
          const month = cur.transaction_date.slice(0, 7);
          const type = cur.account_type; // number (1~4)
          const sign = cur.transaction_type === "DEPOSIT" ? 1 : -1;

          if (!prev[month]) prev[month] = {};
          if (!prev[month][type]) prev[month][type] = 0;

          prev[month][type] += sign * cur.amount;
          return prev;
        },
        {}
      );

      const monthlyList = Object.entries(grouped).map(([date, accountObj]) => {
        const row: any = { date };

        Object.keys(ACCOUNT_TYPE_MAP).forEach((key) => {
          const type = Number(key);
          row[type] = accountObj[type] || 0;
        });

        return row;
      });

      // console.log(monthlyList);

      const donut = Object.keys(ACCOUNT_TYPE_MAP).map((key) => {
        const type = Number(key);
        return {
          label: ACCOUNT_TYPE_MAP[type],
          value: monthlyList.reduce((sum, item) => sum + (item[type] || 0), 0),
        };
      });

      setChartData(monthlyList.sort((a, b) => a.date.localeCompare(b.date)));
      setPieData(donut);
    }
  }, [data]);

  return { chartData, pieData };
};
