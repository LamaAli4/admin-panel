import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routesSection } from "./router/section";
import "./index.css";
import ReactDOM from "react-dom/client";
import Loading from "./components/loading";

const router = createBrowserRouter(routesSection);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
