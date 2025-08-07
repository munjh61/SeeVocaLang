import { useAuthStore } from "../../stores/AuthStore";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  console.log("🔒 PrivateRoute: isLoggedIn =", isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
