import type {
  AccountType,
  BarGroupChartDataType,
  TransactionType,
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

export interface AccountData {
  bankName: string;
  accountType: AccountType;
  accountNumber: string;
  amount: number;
  regiDate: string;
  histoty: HistoryData[];
}

export interface HistoryData {
  transactionId: string; // 입출금 아이디
  date: string; // YYYY-MM-DD // 입출금 날짜
  amount: number; // 금액
  transactionType: TransactionType; // 입출금 종류 (입금 / 출금)
  description: string; // 설명
  accountType: AccountType; // 계좌 종류
  bankName: string; // 은행 이름
  sender: string; // 입금자 (보낸사람)
}

export interface Account {
  id: number;
  account_num: string;
  balance: number;
  bank_name: string;
  user_name: string;
  account_type: number;
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
  transaction_type: string; //"WITHDRAWAL"
  transactor: string;
  update_date: string;
}

export interface GetParams {
  page?: number;
  limit?: number;
  keyword?: string;
  sort?: string;
}
