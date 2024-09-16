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
import AppliedJobs from "../JobSeekerPages/AppliedJobs/AppliedJobs";
import AppliedJobDetails from "../JobSeekerPages/AppliedJobs/AppliedJobDetails";
import ViewApplicants from "../EmployerPages/ViewApplicants/ViewApplicants";
import SeeAllCandidate from "../EmployerPages/ViewApplicants/SeeAllCandidate";
import ContactPage from "../PublicPages/ContactPage/ContactPage";
import EntrepreneurHome from "../Entrepreneur/EntepreneurHome/EntrepreneurHome";
import EntrepreneurInvestment from "../Entrepreneur/Investment/EntrepreneurInvestment";
import Invest from "../PublicPages/Invest/Invest";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AdminHome from "../Admin/AdminHome/AdminHome";
import AdminLoadJobs from "../Admin/AdminLoadJobs/AdminLoadJobs";
import AdminAllUsers from "../Admin/AdminAllUsers/AdminAllUsers";
import PrivateRoutes from "./PrivateRoutes";
import CustomCV from "../JobSeekerPages/AICvBuilder/pages/CustomCV";
import PreviewCV from "../JobSeekerPages/AICvBuilder/PreviewCV";

const axiosPublic = useAxiosPublic();
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
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><Dashboard /></PrivateRoutes> ,
    children: [
      {
        //for new user
        path: "Home",
        element: <NewDashboardHome />,
      },
      {
        path: "help",
        element: <ContactPage />,
      },
      {
        path: "invest",
        element: <Invest />,
        loader: async () => {
          const result = await axiosPublic.get(`/invest`);
          return result.data;
        },
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
        path: "manageJobs",
        element: <ManageJobPost />,
      },
      {
        path: "postNewJob",
        element: <PostJob />,
      },
      {
        path: "pastJobs",
        element: <PastJobs />,
      },
      {
        path: "applicants",
        element: <ViewApplicants />,
      },
      {
        path: `seeAllCandidate/:id`,
        element: <SeeAllCandidate />,
      },
      //entrepreneur
      {
        path: "entrepreneurHome",
        element: <EntrepreneurHome />,
      },
      //jobSeeker
      {
        path: "jobSeekerHome",
        element: <JobSeekerHome />,
      },
      {
        path: "findJobs",
        element: <FindJobs />,
      },
      {
        path: "jobDetails/:id",
        element: <JoDetailsPageForJobSeeker />,
      },
      {
        path: "appliedJobs",
        element: <AppliedJobs />,
      },
      {
        path: "appliedJobDetails/:id",
        element: <AppliedJobDetails />,
      },
      {
        path: "investment",
        element: <EntrepreneurInvestment />,
      },
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "allJobs",
        element: <AdminLoadJobs />,
      },
      {
        path:'allUsers',
        element:<AdminAllUsers/>
      },
      {
        path:'myCV',
        element:<PreviewCV/>
      },
      {
        path:'editCV',
        element:<CustomCV/>
      }
    ],
  },
]);

export default router;
