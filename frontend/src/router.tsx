import { createBrowserRouter } from "react-router-dom";
import { ProtectedRouter } from "./pages/ProtectedRouter";
import { Root } from "./pages/Root";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { AccountDetail } from "./pages/accountDetail/AccountDetail";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <Root />
      </ProtectedRouter>
    ),
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/detail", element: <AccountDetail /> },
    ],
  },
  { path: `*`, element: <NotFound /> },
]);
