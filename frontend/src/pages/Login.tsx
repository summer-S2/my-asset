import { Button, Input } from "antd";
import { PageLayout } from "../components/layout/PageLayout";
import { useAuthStore } from "../stores/authStore";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { LoginSchema } from "../validators/login";
import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "../assets/icons/GoogleIcon";
import { useState } from "react";
import { useAlertStore } from "../stores/alertStore";

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { openAlert } = useAlertStore();

  const { control, handleSubmit, watch } = useForm<LoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { loginWithGoogle, loginWithEmail } = useAuthStore();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await loginWithEmail(data.username, data.password);
      navigate("/");
    } catch (err) {
      openAlert({
        title: "로그인 실패",
        message: "이메일 혹은 비밀번호를 다시 한번 확인해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      openAlert({
        title: "로그인 실패",
        message: "로그인에 실패했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout withoutHeader>
      <div
        className="w-full h-full mx-auto"
        style={{
          paddingTop: "calc(var(--vh, 1vh) * 20)",
          paddingBottom: "calc(var(--vh, 1vh) * 20)",
        }}
      >
        <div className="flex flex-col items-center p-6 gap-6 w-full max-w-xl mx-auto border-1 border-gray-200 rounded-4xl shadow-xl">
          {/* 로고 */}
          <div className="text-3xl py-6 font-bold">My Asset 💸</div>
          {/* <h1 className="font-bold text-2xl">로그인</h1> */}
          <form
            className="flex flex-col gap-4 w-full "
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
                <Input.Password
                  size="large"
                  id={"password"}
                  placeholder="비밀번호를 입력해주세요."
                  type="password"
                  {...field}
                />
              )}
            />

            <Button
              size="large"
              htmlType="submit"
              color="primary"
              variant="solid"
              disabled={isLoading || !watch("password") || !watch("username")}
            >
              로그인
            </Button>
          </form>

          <div className="w-full flex justify-end">
            <Button
              size="large"
              htmlType="button"
              onClick={handleLogin}
              disabled={isLoading}
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
