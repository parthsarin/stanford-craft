import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Dashboard;