import { number, object, string, type InferType } from "yup";

export const addAccountValidator = object({
  bankName: string().required(),
  accountType: string().required(),
  amount: number(),
  date: string(),
});

export type AddAccountSchema = InferType<typeof addAccountValidator>;
