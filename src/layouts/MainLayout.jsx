import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="md:px-0 lg:px-0">
      <Outlet />
    </div>
  );
};

export default MainLayout;
