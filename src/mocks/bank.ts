import { Faker, ko, en } from "@faker-js/faker";
import type { HistoryData } from "../types/api";
import { ACCOUNT_TYPE, BANK_TYPE, TRANSACTION_TYPE } from "../utils/constants";

const faker = new Faker({ locale: [ko, en] });

// 히스토리 데이터 생성
const getHistoryData = (): HistoryData => ({
  transactionId: faker.string.uuid(),
  date: faker.date.recent({ days: 180 }).toISOString().split("T")[0], // 0000-00-00
  amount: faker.number.int({ min: 1, max: 20000 }) * 1000, // 1000 단위
  transactionType: faker.helpers.arrayElement(TRANSACTION_TYPE),
  description: faker.lorem.words(2),
  accountType: faker.helpers.arrayElement(ACCOUNT_TYPE),
  bankName: faker.helpers.arrayElement(BANK_TYPE),
  sender: faker.person.fullName(),
  //   accountNumber: faker.finance.accountNumber(),
});
//   accountNumber: faker.helpers.arrayElement(ACCOUT_NUMBER_LIST),

export const getHistoryList = (count: number): HistoryData[] => {
  return Array.from({ length: count }, getHistoryData);
};
