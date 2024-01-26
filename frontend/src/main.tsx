import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/root.layout.tsx";
import HomePage from "./pages/home/home.page.tsx";
import SignInPage from "./pages/sign-in.page.tsx";
import SignUpPage from "./pages/sign-up.page.tsx";
import MainLayout from "./layout/main.layout.tsx";
import JobPage from "./pages/job/job.page.tsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/home", element: <HomePage /> },
          {
            path: "jobs",
            children: [
              {
                path: ":id",
                element: <JobPage />,
              },
            ],
          },
        ],
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
