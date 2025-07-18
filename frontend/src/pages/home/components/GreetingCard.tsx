import type { User } from "firebase/auth";

interface Props {
  user: User | null;
}

export const GreetingCard = ({ user }: Props) => {
  return (
    <div className="w-full h-[320px] rounded-4xl bg-indigo-900">
      <p className="text-white p-4">{`${user?.displayName}님 안녕하세요 😃`}</p>
    </div>
  );
};
