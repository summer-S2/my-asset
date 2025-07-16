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

// 계좌 데이터 생성
export const getAccountList = (count: number, startIndex: number) => {
  return Array.from({ length: count }, (_, i) => {
    const index = startIndex + i;

    // 한 번만 생성된 날짜로 모든 필드 공유
    const date = faker.date
      .recent({ days: 180 })
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);

    return {
      id: index + 1,
      bank_id: faker.number.int({ min: 1, max: 6 }),
      user_id: 1,
      account_num: faker.finance.accountNumber(13),
      balance: 0,
      issue_date: date,
      create_date: date,
      update_date: date,
      account_type: faker.number.int({ min: 1, max: 4 }), // 1:입출금, 2:저축, 3:증권, 4:대출
    };
  });
};

export const getAcccountHistory = (count: number, startIndex: number) => {
  return Array.from({ length: count }, (_, i) => {
    const index = startIndex + i + 1;

    // 한 번만 생성된 날짜로 모든 필드 공유
    const date = faker.date
      .recent({ days: 180 })
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);

    return {
      id: index,
      account_id: faker.number.int({ min: 1, max: 35 }),
      transaction_date: date,
      transaction_type: faker.helpers.arrayElement(["DEPOSIT", "WITHDRAWAL"]),
      transactor:
        Math.random() < 0.5 ? faker.person.fullName() : faker.company.name(),
      memo: faker.lorem.words(2),
      amount: faker.number.int({ min: 1, max: 20000 }) * 1000, // 1000 단위,
      balance: 0,
      create_date: date,
      update_date: date,
    };
  });
};
// const getAccountData = (index: number) => ({
//   id: index,
//   bank_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6]),
//   user_id: 1,
//   account_num: faker.finance.accountNumber(13),
//   balance: 0,
//   issue_date: faker.date
//     .recent({ days: 180 })
//     .toISOString()
//     .replace("T", " ")
//     .slice(0, 19),
//   create_date: faker.date
//     .recent({ days: 180 })
//     .toISOString()
//     .replace("T", " ")
//     .slice(0, 19),
//   update_date: faker.date
//     .recent({ days: 180 })
//     .toISOString()
//     .replace("T", " ")
//     .slice(0, 19),
// });

// export const getAccountList = (count: number, startIndex: number) => {
//   return Array.from({ length: count }, (_, i) =>
//     getAccountData(startIndex + i)
//   );
// };
