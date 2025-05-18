import "./App.css";
import { routes } from "./router";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Button } from "antd";

export function App() {
  return (
    <Suspense
      fallback={<Button type="primary" loading iconPosition={"start"} />}
    >
      <RouterProvider
        router={routes}
        future={{
          v7_startTransition: true,
          //v7_relativeSplatPath: true,
        }}
      />
    </Suspense>
  );
}
