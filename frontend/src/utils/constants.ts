export const ACCOUNT_TYPE_MAP: Record<number, string> = {
  1: "입출금",
  2: "저축",
  3: "증권",
  4: "연금",
};

export const ACCOUNT_TYPE_KEY_LIST = Object.keys(ACCOUNT_TYPE_MAP).map(Number); // [1,2,3,4]

export const ACCOUNT_TYPE_LABEL_LIST = Object.values(ACCOUNT_TYPE_MAP); // ["입출금", "저축", "증권", "연금"]

export const TRANSACTION_TYPE_MAP: Record<string, string> = {
  DEPOSIT: "입금",
  WITHDRAWAL: "출금",
};

export const TRANSACTION_TYPE_KEY_LIST = Object.keys(TRANSACTION_TYPE_MAP); // ["DEPOSIT", "WITHDRAWAL"]

export const TRANSACTION_TYPE_LABEL_LIST = Object.values(TRANSACTION_TYPE_MAP); // ["입금", "출금"]

// 은행 선택 SELECT 옵션
export const BANK_OPTION = [
  { value: 1, label: "쿼터백은행" },
  { value: 2, label: "신한은행" },
  { value: 3, label: "카카오뱅크" },
  { value: 4, label: "우리은행" },
  { value: 5, label: "국민은행" },
  { value: 6, label: "하나은행" },
];

// 계좌 타입 선택 SELECT 옵션
export const ACCOUNT_TYPE_OPTION = [
  { value: 1, label: "입출금" },
  { value: 2, label: "저축" },
  { value: 3, label: "증권" },
  { value: 4, label: "연금" },
];

export const CHART_COLORS = [
  "#4A55A2",
  "#7895CB",
  "#A0BFE0",
  "#C5DFF8",
  "#FFB84C",
  "#F266AB",
  "#A459D1",
  "#2CD3E1",
  "#F2A33A",
  "#594139",
  "#3776CB",
  "#B22E5B",
  "#505050",
  "#4295A5",
  "#C23E38",
  "#33776B",
  "#F2C14F",
  "#99815E",
  "#D5552E",
  "#749D47",
  "#303F9F",
  "#495A63",
  "#712C9C",
];
