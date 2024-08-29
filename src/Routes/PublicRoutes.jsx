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
import PostJob from "../EmployerPages/PostJobs/PostJob";
import ManageJobPost from "../EmployerPages/ManageJobPost/ManageJobPost";
import PastJobs from "../EmployerPages/PastJobs/PastJobs";
import FindJobs from "../JobSeekerPages/FindJobs/FindJobs";
import JoDetailsPageForJobSeeker from "../JobSeekerPages/FindJobs/JoDetailsPageForJobSeeker";

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
      {
        //both employer and entrepreneur
        path:'manageJobs',
        element:<ManageJobPost/>
      },
      {
        path: 'postNewJob',
        element:<PostJob/>
      },
      {
        path:'pastJobs',
        element:<PastJobs/>
      },
      //jobSeeker
      {
        path:'jobSeekerHome',
        element:<JobSeekerHome/>
      },
      {
        path:'findJobs',
        element:<FindJobs/>
      },
      {
        path:'jobDetails/:id',
        element:<JoDetailsPageForJobSeeker/>
      }
    ],
  },
]);

export default router;
