import { memo } from "react";

interface Props {
  text: string;
  id: string; // htmlFor에 전달할 값
}

export const Label = memo(({ text, id }: Props) => {
  return (
    <label htmlFor={id} className="pl-1 text-xs font-semibold text-indigo-900">
      {text}
    </label>
  );
});
