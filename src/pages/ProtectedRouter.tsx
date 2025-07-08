import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { onUserStateChange } from "../services/firebase";

interface Props {
  children: ReactNode;
}

export const ProtectedRouter = ({ children }: Props) => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(user);
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      console.log(user);

      if (!user) {
        navigate("/login");
      }
    });
  }, [setUser]);

  // TODO 경로보호 넣기
  return children;
};
