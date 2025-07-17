interface Props {
  text?: string;
}

export const ErrorText = ({ text }: Props) => {
  if (!text) return null;
  return <p className="text-red-400 text-xs pl-2 pt-1">{text}</p>;
};
