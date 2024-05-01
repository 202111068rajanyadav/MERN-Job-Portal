import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import PostJob from "../Pages/PostJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import Login from "../components/Login";
import JobDetails from "../Pages/JobDetails";
import UpdateJob from "../Pages/UpdateJob";
// import Home from "../Pages/home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/",element: <Home />},
      { path: "/post-job",
      element: <PostJob />},
      { path: "/my-job",
      element: <MyJobs/>},
     
      { path: "/salary",
      element: <SalaryPage/>},
      { path: "/edit-job/:id",
      element: <UpdateJob/>,
      loader: ({params}) => fetch()
    },
      { path: "/login",
      element: <Login/>},
      { path: "/job/:id",
      element: <JobDetails/>},
     
    ],
  },
]);

export default router;
