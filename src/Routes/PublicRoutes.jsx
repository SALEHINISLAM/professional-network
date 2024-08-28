import { createBrowserRouter } from "react-router-dom";
import PublicOutlet from "../LayOut/PublicOutlet";
import Home from "../PublicPages/Home/Home";
import EmployerHome from "../EmployerPages/EmployerHome/EmployerHome";
import Register from "../PublicPages/Register/Register";
import Login from "../PublicPages/Login/Login";
import UpdateUserInfo from "../PublicPages/UpdateUserInfo/UpdateUserInfo";
import Dashboard from "../LayOut/Dashboard";
import NewDashboardHome from "../PublicPages/NewDashboardHome/NewDashboardHome";
import JobSeekerHome from "../JobSeekerPages/JobSeekerHome/JobSeekerHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicOutlet />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        //for new user
        path: "Home",
        element: <NewDashboardHome />,
      },
      //employer
      {
        path: "employerHome",
        element: <EmployerHome />,
      },
      {
        path: "updateUser",
        element: <UpdateUserInfo />,
      },
      //jobSeeker
      {
        path:'jobSeekerHome',
        element:<JobSeekerHome/>
      }
    ],
  },
]);

export default router;
