import { Faker, ko, en } from "@faker-js/faker";
import type { Account, AssetData, Bank, Transaction } from "../types/api";
import { ACCOUNT_TYPE, BANK_TYPE, TRANSACTION_TYPE } from "../utils/constants";
import type { BarGroupChartDataType } from "../types/common";

const faker = new Faker({ locale: [ko, en] });

const generateTransaction = (): Transaction => ({
  transactionId: faker.string.uuid(),
  date: faker.date.recent().toISOString().split("T")[0], // 0000-00-00
  type: faker.helpers.arrayElement(TRANSACTION_TYPE),
  amount: faker.number.int({ min: 1, max: 20000 }) * 1000, // 1000 단위
  description: faker.lorem.words(2),
});

const generateAccount = (): Account => {
  // TODO 히스토리에 기간조건을 넣고싶은데 어떻게 할건지 고민 필요 ,,, 시간없으면 드랍 ..
  const history: Record<string, Transaction[]> = {};

  for (let i = 0; i < 6; i++) {
    const month = faker.date.recent({ days: 180 }).toISOString().slice(0, 7); // 0000-00
    history[month] = Array.from(
      { length: faker.number.int({ min: 3, max: 30 }) },
      generateTransaction
    );
  }

  return {
    accountId: faker.string.uuid(),
    accountName: faker.finance.accountName(),
    accountNumber: faker.finance.accountNumber(),
    type: faker.helpers.arrayElement(ACCOUNT_TYPE),
    balance: faker.number.int({ min: 1, max: 20000 }) * 1000, // 1000 단위
    history,
  };
};

export const generateFakeData = (): AssetData => {
  const banks: Bank[] = Array.from({ length: BANK_TYPE.length }, () => ({
    bankId: faker.string.uuid(),
    bankName: faker.helpers.arrayElement(BANK_TYPE),
    accounts: Array.from(
      { length: faker.number.int({ min: 2, max: 4 }) },
      generateAccount
    ),
  }));

  const monthlyAssetsByType: Record<string, BarGroupChartDataType> = {};

  banks.forEach((bank) => {
    bank.accounts.forEach((account) => {
      Object.entries(account.history).forEach(([month, transactions]) => {
        if (!monthlyAssetsByType[month]) {
          monthlyAssetsByType[month] = {
            date: month,
            deposit: 0,
            loan: 0,
            investment: 0,
            saving: 0,
          };
        }

        const sum = transactions.reduce(
          (acc, cur) => acc + (cur.type === "출금" ? -cur.amount : cur.amount),
          0
        );

        const typeKeyMap: Record<string, keyof BarGroupChartDataType> = {
          입출금: "deposit",
          대출: "loan",
          증권: "investment",
          저축: "saving",
        };

        const key = typeKeyMap[account.type];
        const typedKey = key as "deposit" | "loan" | "investment" | "saving";

        if (key) {
          monthlyAssetsByType[month][typedKey] =
            (monthlyAssetsByType[month][typedKey] ?? 0) + sum;
        }
      });
    });
  });

  const barGroupData: BarGroupChartDataType[] = Object.values(
    monthlyAssetsByType
  ).sort((a, b) => a.date.localeCompare(b.date));

  return {
    accounts: banks,
    // totalAssets,
    monthTotal: barGroupData,
  };
};
