import { Faker, ko, en } from "@faker-js/faker";
import {
  ACCOUNT_TYPE_KEY_LIST,
  TRANSACTION_TYPE_KEY_LIST,
} from "../utils/constants";

const faker = new Faker({ locale: [ko, en] });

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
      account_type: faker.helpers.arrayElement(ACCOUNT_TYPE_KEY_LIST), // 1:입출금, 2:저축, 3:증권, 4:대출
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
      transaction_type: faker.helpers.arrayElement(TRANSACTION_TYPE_KEY_LIST),
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
