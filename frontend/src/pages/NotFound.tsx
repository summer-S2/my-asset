import { Button, Result } from "antd";
import { PageLayout } from "../components/layout/PageLayout";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <PageLayout withoutHeader withoutMenu>
      <div className="w-full h-full flex-center">
        <Result
          status="404"
          title="요청하신 페이지를 찾을 수 없습니다."
          subTitle="주소를 다시 확인해 주시거나, 아래 버튼을 통해 홈으로 이동해 주세요."
          extra={
            <div className="flex-center gap-4">
              <Button
                onClick={() => navigate("/", { replace: true })}
                type="primary"
              >
                홈
              </Button>
              <Button onClick={() => navigate(-1)} type="primary">
                뒤로가기
              </Button>
            </div>
          }
        />
      </div>
    </PageLayout>
  );
};
