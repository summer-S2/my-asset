import { Button, Input } from "antd";
import { PageLayout } from "../components/layout/PageLayout";
import { useAuthStore } from "../stores/authStore";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { LoginSchema } from "../validators/login";
import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "../assets/icons/GoogleIcon";

export const Login = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginSchema>({
    defaultValues: {
      //   username: "qb@test.com",
      //   password: "qb@test.com",
      username: "",
      password: "",
    },
  });
  const { loginWithGoogle, loginWithEmail } = useAuthStore();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      await loginWithEmail(data.username, data.password);
      navigate("/");
    } catch (err) {
      alert("이메일 혹은 비밀번호를 다시 한번 확인해주세요.");
    }
  };

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      alert("로그인에 실패했습니다.");
    }
  };

  // TODO 로그인 구현
  return (
    <PageLayout withoutHeader>
      <div className="w-full h-full bg-indigo-100">
        <div className="flex flex-col items-center p-4 gap-4 w-full">
          <h1 className="font-bold text-4xl">로그인</h1>
          <form
            className="flex flex-col gap-4 w-full max-w-3xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name={"username"}
              control={control}
              render={({ field }) => (
                <Input
                  size="large"
                  id={"username"}
                  placeholder="아이디를 입력해주세요."
                  {...field}
                />
              )}
            />
            <Controller
              name={"password"}
              control={control}
              render={({ field }) => (
                <Input
                  size="large"
                  id={"password"}
                  placeholder="비밀번호를 입력해주세요."
                  {...field}
                />
              )}
            />

            <Button
              size="large"
              htmlType="submit"
              color="primary"
              variant="solid"
            >
              로그인
            </Button>
          </form>

          <div className="w-full flex justify-end">
            <Button
              size="large"
              htmlType="button"
              onClick={handleLogin}
              icon={
                <div className="flex items-center justify-center">
                  <GoogleIcon />
                </div>
              }
            >
              구글로그인
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
