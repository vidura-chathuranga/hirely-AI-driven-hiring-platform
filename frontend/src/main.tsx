import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/root.layout.tsx";
import HomePage from "./pages/home/home.page.tsx";
import SignInPage from "./pages/sign-in/sign-in.page.tsx";
import SignUpPage from "./pages/sign-up/sign-up.page.tsx";
import MainLayout from "./layout/main.layout.tsx";
import JobPage from "./pages/job/job.page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminMainLayout from "./layout/admin.layout.tsx";
import JobCreatePage from "./pages/admin/createJob/job-create.page.tsx";
import AdminJobPostsPage from "./pages/admin/jobPosts/admin-job-posts.page.tsx";
import AdminJobPage from "./pages/admin/job/admin-job.page.tsx";
import AdminJobApplicationPage from "./pages/admin/jobApplication/admin-job-application.page.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/toaster.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

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
        path: "admin",
        element: <AdminMainLayout />,
        children: [
          {
            path: "jobs",
            element: <AdminJobPostsPage />,
          },
          {
            path: "job/create",
            element: <JobCreatePage />,
          },
          {
            path: "job/:id",
            element: <AdminJobPage />,
          },
          {
            path: "job/:id/application/:applicationId",
            element: <AdminJobApplicationPage />,
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

// create query client
const client = new QueryClient();

// import the publish Clerk Publish key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
