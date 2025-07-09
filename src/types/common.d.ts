import type {
  ACCOUNT_KEY,
  ACCOUNT_TYPE,
  TRANSACTION_TYPE,
} from "../utils/constants";

export type AccountType = (typeof ACCOUNT_TYPE)[number];

export type TransactionType = (typeof TRANSACTION_TYPE)[number];

export type AccountKeyType = (typeof ACCOUNT_KEY)[number];

export type ChartDataType = {
  label: string;
  value: number;
};

export type BarGroupChartDataType = {
  date: string; // 날짜(월)
  deposit: number; // 입출금
  loan: number; // 대출
  investment: number; // 증권
  saving: number; // 저축
};
