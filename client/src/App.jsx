import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Import pages
import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
  Table,
} from "./pages";

// Import actions and loaders
import { registerAction } from "./pages/Register";
import { loginAction } from "./pages/Login";
import { dashboardLoader } from "./pages/DashboardLayout";
import { addJobAction } from "./pages/AddJob";
import { allJobsLoader } from "./pages/AllJobs";
import { editJobaction, editJobLoader } from "./pages/EditJob";
import { deleteJobAction } from "./pages/DeleteJob";
import { adminLoader } from "./pages/Admin";
import { profileAction } from "./pages/Profile";
import { statsLoader } from "./pages/Stats";
import { ErrorElement } from "./components";

// Light/Dark theme toggle
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
    },
  },
});

// App Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            action: editJobaction(queryClient),
            loader: editJobLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction(queryClient),
            errorElement: <ErrorElement />,
          },
        ],
      },
      {
        path: "table",
        element: <Table />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
