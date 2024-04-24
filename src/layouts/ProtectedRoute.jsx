import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../Pages/Login";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated, "auth");

  return isAuthenticated ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
