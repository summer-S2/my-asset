import { useEffect, useState, type ReactNode } from "react";
import { useAuthStore } from "../stores/authStore";
import { useLocation, useNavigate } from "react-router-dom";
import { onUserStateChange } from "../services/firebase";

interface Props {
  children: ReactNode;
}

export const ProtectedRouter = ({ children }: Props) => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const unsubscription = onUserStateChange((user) => {
      setUser(user);

      if (!user && location.pathname !== "/login") {
        navigate("/login");
      }

      setIsLoading(false);
    });

    return () => unsubscription();
  }, [setUser, location.pathname]);

  // 신원 확인중일때는 아무것도 표출하지 않음
  if (isLoading) return null;

  return children;
};
