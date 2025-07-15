import { useEffect, useState } from "react";
import type { HistoryData } from "../types/api";
import type { AccountData } from "../types/api";
import { faker } from "@faker-js/faker";

export const useAccountData = (data: HistoryData[] | null) => {
  const [accountData, setAccountData] = useState<AccountData[]>([]);

  useEffect(() => {
    if (data) {
      const grouped = data.reduce<Record<string, HistoryData[]>>(
        (prev, cur) => {
          const key = `${cur.bankName}_${cur.accountType}`;
          if (!prev[key]) prev[key] = [];
          prev[key].push(cur);
          return prev;
        },
        {}
      );

      const result: AccountData[] = Object.entries(grouped).map(
        ([_, histoty]) => {
          const { bankName, accountType } = histoty[0];
          const accountNumber = faker.finance.accountNumber(13);

          const updatedHistory = histoty.map((tx) => ({
            ...tx,
            accountNumber,
          }));

          const amount = updatedHistory.reduce((sum, tx) => {
            return (
              sum + (tx.transactionType === "입금" ? tx.amount : -tx.amount)
            );
          }, 0);

          const regiDate = histoty.map((tx) => tx.date).sort()[0]; // 가장 오래된 날짜

          return {
            bankName,
            accountType,
            accountNumber,
            amount,
            regiDate,
            histoty,
          };
        }
      );

      setAccountData(result);
    }
  }, [data]);
  return { accountData };
};
