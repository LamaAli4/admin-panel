import { lazy } from "react";
import MainLayout from "../layouts/main-layout";

const Dashboard = lazy(() => import("../pages/dashboard"));
const Users = lazy(() => import("../pages/user"));
const Products = lazy(() => import("../pages/products"));
const NotFound = lazy(() => import("../pages/page-not-found"));

export const routesSection = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
