import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: { fontFamily: "Pretendard" },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
