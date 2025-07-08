import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <ConfigProvider
    // theme={theme} // TODO 테마넣기
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
