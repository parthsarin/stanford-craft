import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { UserContext } from "../Auth";
import { useContext } from "react";

const hideSidebarPaths = ["/dash/datamax/quiz/"];

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const loc = useLocation();
  const hideSidebar = hideSidebarPaths.some((path) =>
    loc.pathname.startsWith(path)
  );
  const showSidebar = !(hideSidebar && !user);

  let divStyles: any = { minHeight: "97vh", width: "100%" };
  if (showSidebar) divStyles = { ...divStyles, marginLeft: "72px" };

  return (
    <div className="flex flex-row">
      {showSidebar && <Sidebar />}
      <div style={divStyles}>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;