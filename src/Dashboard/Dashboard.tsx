import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div style={{ minHeight: "97vh", marginLeft: "72px", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;