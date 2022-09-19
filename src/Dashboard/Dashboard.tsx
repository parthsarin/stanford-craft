import { useAuthUser } from "@react-query-firebase/auth";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MySwal } from "../Generic/Notify";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { isLoading, data: user } = useAuthUser('user', getAuth());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }

    if (
      !isLoading                                    // User is loaded
      && user                                       // User is logged in
      && !user.displayName                          // User has no display name 
      && location.pathname !== '/dashboard/profile' // User is not on profile page
    ) {
      navigate('/dashboard/profile')
    }

    if (
      !isLoading                                    // User is loaded
      && user                                       // User is logged in
      && !user.displayName                          // User has no display name 
      && location.pathname === '/dashboard/profile' // User is on profile page
    ) {
      MySwal
        .fire({
          icon: 'info',
          title: 'Please add your name to your profile'
        })
    }
  }, [isLoading, user, navigate, location]);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Dashboard;