import type { User } from "firebase/auth";
import cardImg from "../../../assets/images/credit-card.png";
import beachImg from "../../../assets/images/beach.png";

interface Props {
  user: User | null;
}

export const GreetingCard = ({ user }: Props) => {
  return (
    <div
      className={`flex-grow h-[320px] rounded-4xl bg-indigo-50 relative bg-position-[50%_60%] bg-no-repeat bg-cover`}
      style={{ backgroundImage: `url(${beachImg})` }}
    >
      <p className="text-white text-4xl p-4 absolute right-5 top-5">{`${user?.displayName}님 안녕하세요! 😃`}</p>
      <img
        src={cardImg}
        className="w-[320px] absolute bottom-5 left-5 animate-flip-bounce"
      />
    </div>
  );
};
