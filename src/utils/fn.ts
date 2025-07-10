/**
 * 객체가 비었는지 체크하는 함수
 */
export const isEmpty = (obj: any): boolean => {
  if (obj == null) return true; // null 또는 undefined 체크
  if (typeof obj !== "object") return false; // 객체 또는 배열이 아닌 경우 false
  return Object.keys(obj).length === 0;
};

/**
 * 숫자를 '2억 3400만원 500원'처럼 한글 화폐 형식으로 변환
 */
export const formatKoreanCurrency = (amount: number): string => {
  if (amount === 0) return "0원";

  const units = {
    억: Math.floor(amount / 100000000),
    만: Math.floor((amount % 100000000) / 10000),
    원: amount % 10000,
  };

  let result = "";
  if (units.억) result += `${units.억}억 `;
  if (units.만) result += `${units.만.toLocaleString()}만 `;
  if (units.원) result += `${units.원.toLocaleString()}`;

  return result.trim() + "원";
};

export const accountMasking = (account: string) => {
  if (!account) return "";

  const first = account.slice(0, 4);
  const middle = account.slice(4, 7);
  return `${first}-${middle}-******`;
};
