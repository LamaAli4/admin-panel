import { lazy, Suspense } from "react";
import MainLayout from "../layouts/main-layout";
import Loading from "../components/loading";

const Dashboard = lazy(() => import("../Pages/dashboard"));
const Users = lazy(() => import("../Pages/user"));
const Settings = lazy(() => import("../Pages/settings"));
const NotFound = lazy(() => import("../Pages/page-not-found"));

export const routesSection = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<Loading />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<Loading />}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
];
