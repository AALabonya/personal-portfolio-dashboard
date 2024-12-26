import App from "@/App";


import Error from "@/pages/Error";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ManageBlog from "@/pages/ManageBlog";
import ManageExperience from "@/pages/ManageExperience";
import ManageProject from "@/pages/ManageProject";
import ManageSkill from "@/pages/ManageSkill";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },

      {
        path: "/dashboard/manage-project",
        element: <ManageProject></ManageProject>,
      },
      {
        path: "/dashboard/manage-blog",
        element: <ManageBlog></ManageBlog>,
      },
      {
        path: "/dashboard/manage-skills",
        element: <ManageSkill></ManageSkill>,
      },
      {
        path: "/dashboard/manage-experience",
        element: <ManageExperience></ManageExperience>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Register></Register>,
  },
]);

export default router;
