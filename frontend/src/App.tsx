import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Alert } from "./components/common/Alert";
import { useEffect } from "react";
import { useWindowSize } from "@reactuses/core";
import { theme } from "./styles/antDesignToken";
import { Confirm } from "./components/common/Confirm";
import type { AxiosError } from "axios";
import type { CustomAxiosError } from "./types/api";
import { useQueryClient } from "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<CustomAxiosError>;
  }
}

function App() {
  const { height } = useWindowSize();
  const queryClient = useQueryClient();

  queryClient.setDefaultOptions({
    queries: {
      retry: false,
    },
  });

  useEffect(() => {
    let vh = 0;
    vh = height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [height]);

  return (
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
      <Alert />
      <Confirm />
    </ConfigProvider>
  );
}

export default App;
