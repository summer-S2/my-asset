import { Button } from "antd";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logoutUser, setUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      setUser(null);
    } finally {
      navigate("/login");
    }
  };

  return (
    <header className="fixed h-16 w-full shrink-0 z-50 bg-indigo-100">
      <div className="w-full h-full flex items-center mx-auto justify-between px-4 max-w-[1280px]">
        <div className="font-bold">My Asset 💸</div>

        {user && (
          <div className="flex gap-4 items-center">
            <div>{`${user?.displayName ?? "사용자"}`} 님</div>
            <Button htmlType="button" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
