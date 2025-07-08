import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ProtectedRouter = ({ children }: Props) => {
  // TODO 경로보호 넣기
  return children;
};
