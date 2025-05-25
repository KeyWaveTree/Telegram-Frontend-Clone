//구현한 것을 리엑트에 가져오기 위한 라우터들?
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import Chat from "./pages/Chat";
import ChatLayout from "./layouts/ChatLayout";
import { Cookies } from "react-cookie";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,

          //로더 옵션을 람다 함수를 사용해서 리엑트 쿠키를 통해 접근 제어
          loader: () => {
            //리엑트 쿠키를 생성 해준다.
            const cookies = new Cookies();
            //만약 쿠키의 정보중 access_token이 없다면 "/auth/login" 링크으로 던저라
            if (!cookies.get("access_token")) throw redirect("/auth/login");
            //access_token이 있다면 chat링크로 던저라
            else throw redirect("chat");
          },
        },
        {
          path: "auth",
          element: (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ),
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "signup",
              element: <Signup />,
            },
          ],
        },
        {
          path: "chat",
          loader: () => {
            const cookies = new Cookies();
            if (!cookies.get("access_token")) throw redirect("/auth/login");
          },
          element: (
            <ChatLayout>
              <Outlet />
            </ChatLayout>
          ),
          children: [
            { index: true, element: <></> },
            {
              path: "rooms",
              element: <div>Chat Rooms Page</div>,
            },
            {
              path: ":roomId",
              element: <Chat />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
