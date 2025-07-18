import { number, object, string, type InferType } from "yup";

export const addAccountValidator = object({
  account_num: string()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .matches(/^\d{13}$/, "13자리 숫자여야 합니다.")
    .required("계좌번호는 필수입니다."),
  account_type: number()
    // .typeError("숫자만 입력 가능합니다.")
    .required("계좌 유형은 필수입니다."),
  balance: number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("숫자만 입력 가능합니다.")
    .required("잔액은 필수입니다."),
  bank_id: number()
    // .typeError("숫자만 입력 가능합니다.")
    .required("은행 ID는 필수입니다."),
});

export type AddAccountSchema = InferType<typeof addAccountValidator>;
