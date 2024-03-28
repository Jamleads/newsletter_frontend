import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MarketerLogin from "./client/MarketerLogin";
import MarketerLayout from "./layouts/MarketerLayout";
import MarketerSignup from "./client/MarketerSignup";
import DashBoard from "./client/DashBoard";

import LandingPage from "./LandingPage";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import AdminLogin from "./Admin/AdminLogin";
import AdminSignup from "./Admin/AdminSignup";
import AdminDashBoard from "./Admin/AdminDashBoard";
import ErrorPage from "./components/ErrorPage";
import Subscribers from "./client/Subscribers";
import Campaign from "./client/Campaign";
import Post from "./client/Post";
import Draft from "./client/Draft";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route to="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />

        <Route path="errorpage" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/errorpage" />} />

        <Route path="marketer/login" element={<MarketerLogin />} />
        <Route path="marketer/signup" element={<MarketerSignup />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/signup" element={<AdminSignup />} />

        {/* Marketer */}
        <Route path="marketer" element={<MarketerLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="campaign" element={<Campaign />} />
          <Route path="post" element={<Post />} />
          <Route path="draft" element={<Draft />} />
        </Route>

        {/* Admin */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashBoard />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={routes} />;
}

export default App;
