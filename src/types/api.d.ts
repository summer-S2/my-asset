import type {
  AccountType,
  BarGroupChartDataType,
  TransactionType,
} from "./common";

export interface HistoryData {
  transactionId: string; // 입출금 아이디
  date: string; // YYYY-MM-DD // 입출금 날짜
  amount: number; // 금액
  transactionType: TransactionType; // 입출금 종류 (입금 / 출금)
  description: string; // 설명
  accountType: AccountType; // 계좌 종류
  bankName: string; // 은행 이름
  //   accountNumber: string; // 계좌번호
}
