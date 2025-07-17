import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Alert } from "./components/common/Alert";
import { useEffect } from "react";
import { useWindowSize } from "@reactuses/core";
import { theme } from "./styles/antDesignToken";

function App() {
  const { height } = useWindowSize();

  useEffect(() => {
    let vh = 0;
    vh = height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [height]);

  return (
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
      <Alert />
    </ConfigProvider>
  );
}

export default App;
