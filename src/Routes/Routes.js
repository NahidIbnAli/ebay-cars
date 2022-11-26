import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import Blog from "../pages/Blog/Blog";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import AllAdvertisedItems from "../pages/Shared/AllAdvertisedItems/AllAdvertisedItems";
import ErrorElement from "../pages/Shared/ErrorElement/ErrorElement";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/category/:name",
        loader: async ({ params }) =>
          fetch(`http://localhost:5000/category/${params.name}`),
        element: (
          <PrivateRoute>
            <AllAdvertisedItems></AllAdvertisedItems>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        path: "/dashboard",
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
