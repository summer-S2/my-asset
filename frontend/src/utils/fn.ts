import type { SortStateType } from "../types/common";

/**
 * 객체가 비었는지 체크하는 함수
 */
export const isEmpty = (obj: any): boolean => {
  if (obj == null) return true; // null 또는 undefined 체크
  if (typeof obj !== "object") return false; // 객체 또는 배열이 아닌 경우 false
  return Object.keys(obj).length === 0;
};

/**
 * 숫자를 한글 화폐 형식으로 변환
 *
 * 2억 3400만 500원
 */
export const formatKoreanCurrency = (amount: number): string => {
  if (amount === 0 || !amount) return "0원";

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount); // 절댓값 처리

  const units = {
    억: Math.floor(absAmount / 100000000),
    만: Math.floor((absAmount % 100000000) / 10000),
    원: absAmount % 10000,
  };

  let result = "";
  if (units.억) result += `${units.억}억 `;
  if (units.만) result += `${units.만.toLocaleString()}만 `;
  if (units.원) result += `${units.원.toLocaleString()}`;

  return (isNegative ? "-" : "") + (result ? result.trim() : "0") + "원"; // 음수면 '-' 붙이기
};

/**
 * 계좌번호 마스킹 함수
 *
 * 숫자 13자리 -> 0000-000-******
 */
export const accountMasking = (account: string) => {
  if (!account) return "";

  const first = account.slice(0, 4);
  const middle = account.slice(4, 7);
  return `${first}-${middle}-******`;
};

/**
 * 정렬 토글 함수
 * 정렬 순서 -> 오름차순 - 내림차순 - 취소
 */
export const toggleSort = <T>(
  key: keyof T | null,
  setSortState: React.Dispatch<React.SetStateAction<SortStateType<T>>>
) => {
  setSortState((prev) => {
    let nextOrder: "asc" | "desc" | null;
    if (prev.key !== key) nextOrder = "asc";
    else if (prev.order === "asc") nextOrder = "desc";
    else if (prev.order === "desc") nextOrder = null;
    else nextOrder = "asc";

    return { key: nextOrder ? key : null, order: nextOrder };
  });
};

/**
 * 파라미터 객체 전달받아서 쿼리스트링으로 리턴해주는 함수
 */
export const objectToQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

/**
 * ISO 문자열 한국 시간으로 변환해주는 함수
 */
export const formatKST = (dateStr: string): string => {
  const date = new Date(dateStr);

  // 한국 시간으로 포맷팅
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/\. /g, "-") // "2025. 07. 01." → "2025-07-01"
    .replace(".", "");
};
