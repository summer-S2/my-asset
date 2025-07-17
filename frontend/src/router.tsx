import { createBrowserRouter } from "react-router-dom";
import { ProtectedRouter } from "./pages/ProtectedRouter";
import { Root } from "./pages/Root";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { AccountDetail } from "./pages/accountDetail/AccountDetail";
import { Account } from "./pages/account/Account";

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
      { path: "/account", element: <Account /> },
      { path: "/account/:id", element: <AccountDetail /> },
    ],
  },
  { path: `*`, element: <NotFound /> },
]);
