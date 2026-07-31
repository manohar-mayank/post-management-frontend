import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import AdminWrapper from "../layouts/admin-pannel/AdminWrapper";
import Post from "../pages/admin/Post";
import PostAdd from "../pages/admin/PostAdd";
import AdminProtected from "../components/AdminProtected";

const Routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <AdminProtected />,
    children: [
      {
        path: "",
        element: <AdminWrapper />,
        children: [
          {
            path: "post",
            element: <Post />,
          },
          {
            path: "post/add",
            element: <PostAdd />,
          },
        ],
      },
    ],
  },
]);

export default Routes;
