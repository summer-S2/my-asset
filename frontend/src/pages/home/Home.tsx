import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/layout/PageLayout";
import { Button } from "antd";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <div className="flex flex-col p-4 gap-8 w-full h-full">
        <div className="flex justify-evenly flex-col lg:flex-row items-center min-h-[460px]">
          <Button
            onClick={() => {
              navigate("/account");
            }}
          >
            내 계좌 목록 조회
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};
