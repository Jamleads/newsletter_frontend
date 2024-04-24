import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../../Pages/Login";

const ProtectedRoute = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  if (!userInfo) {
    return <Login />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
