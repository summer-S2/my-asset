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
  입출금: number;
  대출: number;
  증권: number;
  저축: number;
};

export type AccountDataType = {
  bankName: string;
  accountType: AccountType;
  accountNumber: string;
  amount: number;
  regiDate: string;
  histoty: HistoryData[];
};

export type OrderType = "asc" | "desc" | null;

export type SortStateType<T> = {
  key: keyof T | null;
  order: OrderType;
};
