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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
