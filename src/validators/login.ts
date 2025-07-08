import { object, string, type InferType } from "yup";

export const loginValidator = object({
  username: string().required(),
  password: string().required(),
});

export type LoginSchema = InferType<typeof loginValidator>;
