import type {
  AccountType,
  BarGroupChartDataType,
  TransactionType,
} from "./common";

export interface Bank {
  bankId: string;
  bankName: string;
  accounts: Account[];
}

export interface Account {
  accountId: string;
  accountName: string;
  accountNumber: string; // 13자리 숫자
  type: AccountType;
  balance: number;
  history: {
    [month: string]: Transaction[];
  };
}

export interface Transaction {
  transactionId: string;
  date: string; // 예: "2025-07-08"
  type: TransactionType;
  amount: number;
  description: string;
}

export interface AssetData {
  //   totalAssets: {
  //     [month: string]: number; // 월별 총자산 계산용
  //   };
  accounts: Bank[];
  monthTotal: BarGroupChartDataType[];
}

export interface HistoryData {
  transactionId: string; // 입출금 아이디
  date: string; // YYYY-MM-DD // 입출금 날짜
  amount: number; // 금액
  transactionType: TransactionType; // 입출금 종류 (입금 / 출금)
  description: string; // 설명
  accountType: AccountType; // 계좌 종류
  bankName: string; // 은행 이름
  accountNumber: string; // 계좌번호
}
