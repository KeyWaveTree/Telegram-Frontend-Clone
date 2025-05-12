import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          Root Layout
          <Outlet />
        </div>
      ),
      children: [
        { index: true, element: <Home /> },
        {
          path: "auth",
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
          element: (
            <div>
              Chat Layout <Outlet />
            </div>
          ),
          children: [
            {
              path: "rooms",
              element: <div>Chat Rooms Page</div>,
            },
            {
              path: ":roomId",
              element: <div>Chat Room Page</div>,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
