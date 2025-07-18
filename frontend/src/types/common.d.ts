import type {
  ACCOUNT_TYPE_MAP,
  TRANSACTION_TYPE_MAP,
} from "../utils/constants";

export type AccountTypeKey = keyof typeof ACCOUNT_TYPE_MAP; // 1 | 2 | 3 | 4

export type AccountTypeLabel = (typeof AccountTypeKey)[number]; // "입출금" | "저축" | "증권" | "연금"

export type TransactionTypeKey = keyof typeof TRANSACTION_TYPE_MAP; // "DEPOSIT" | "WITHDRAWAL";

export type TransactionTypeLabel = (typeof TransactionTypeKey)[string]; //  "입금" | "출금";

export type ChartDataType = {
  label: string;
  value: number;
};

export type BarGroupChartDataType = {
  date: string;
} & Record<number, number>;

export type OrderType = "asc" | "desc" | null;

export type SortStateType<T> = {
  key: keyof T | null;
  order: OrderType;
};
