import type {
  AccountTypeKey,
  AccountTypeLabel,
  TransactionTypeKey,
  TransactionTypeLabel,
} from "./common";

export interface CustomAxiosError {
  message: string;
  code: number;
}

export interface CustomAxiosRes<T> {
  code: number;
  count: number;
  httpStatus: string;
  message: string;
  result: T;
}

export interface ListData<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  list: T[];
}

export interface GetParams {
  page?: number;
  limit?: number;
  keyword?: string;
  sort?: string;
}

export interface Account {
  id: number;
  account_num: string;
  balance: number;
  bank_name: string;
  user_name: string;
  account_type: AccountTypeKey;
  balance: number;
  create_date: string;
  bank_id: number;
}

export interface History {
  account_id: number;
  amount: number;
  create_date: string;
  id: number;
  memo: string;
  transaction_date: string;
  transaction_type: TransactionTypeKey; //"WITHDRAWAL"
  transactor: string;
  update_date: string;
  account_type: AccountTypeKey;
  bank_id: number;
}
