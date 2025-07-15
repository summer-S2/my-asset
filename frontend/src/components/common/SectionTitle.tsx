import { useAuthStore } from "../../stores/authStore";

interface Props {
  text: string;
  withUserName?: boolean; // 사용자 이름 포함 여부
  classNames?: string; // 스타일 전달
}

export const SectionTitle = ({ text, withUserName, classNames }: Props) => {
  const { user } = useAuthStore();
  return (
    <h3
      className={`flex-center text-xl font-semibold text-indigo-900 ${classNames}`}
    >
      {`${withUserName ? `${user?.displayName ?? "사용자"}님 ` : ``}${text}`}
    </h3>
  );
};
