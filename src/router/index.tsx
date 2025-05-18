import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/MainPage"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>Oops...</div>,
  },
]);
