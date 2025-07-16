import { number, object, string, type InferType } from "yup";

export const addAccountValidator = object({
  account_num: string().required(),
  account_type: number().required(),
  balance: number().required(),
  bank_id: number().required(),
});

export type AddAccountSchema = InferType<typeof addAccountValidator>;
