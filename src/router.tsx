import { createBrowserRouter } from "react-router-dom";
import { ProtectedRouter } from "./pages/ProtectedRouter";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

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
      { path: `*`, element: <NotFound /> },
    ],
  },
]);
