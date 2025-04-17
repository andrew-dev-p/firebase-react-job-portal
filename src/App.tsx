import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { useAppSelector } from "./hooks/useAppRedux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./stylesheets/custom-components.css";
import "./stylesheets/layout.css";
import AppliedJobs from "./pages/user/AppliedJobs";
import Profile from "./pages/user/Profile";
import PostedJobs from "./pages/user/PostedJobs";
import NewEditJob from "./pages/user/PostedJobs/NewEditJob";
import AllJobs from "./pages/admin/AllJobs";
import AllUsers from "./pages/admin/AllUsers";
import JobDescription from "./pages/JobDescription";

function App() {
  const { loading } = useAppSelector((state) => state.alert);

  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/applied-jobs" element={<AppliedJobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posted-jobs" element={<PostedJobs />} />
            <Route path="/posted-jobs/new" element={<NewEditJob />} />
            <Route path="/posted-jobs/edit/:id" element={<NewEditJob />} />
            <Route path="/admin/jobs" element={<AllJobs />} />
            <Route path="/admin/users" element={<AllUsers />} />
            <Route path="/job-description/:id" element={<JobDescription />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
