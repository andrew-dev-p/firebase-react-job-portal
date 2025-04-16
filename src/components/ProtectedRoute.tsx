import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import DefaultLayout from "./DefaultLayout";

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default ProtectedRoute;
