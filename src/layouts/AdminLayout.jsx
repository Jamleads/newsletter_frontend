import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className="flex h-[100vh]">
        <div className="sidebar w-[20%] bg-red-400 h-full">Admin Sidebar</div>
        <div className="w-[80%]">
          <div className="nav bg-green-400 py-3">Admin Dashborad</div>

          <div className="body bg-gray-400">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
