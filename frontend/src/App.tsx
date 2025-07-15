import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Alert } from "./components/common/Alert";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: { fontFamily: "Pretendard" },
      }}
    >
      <RouterProvider router={router} />
      <Alert />
    </ConfigProvider>
  );
}

export default App;
