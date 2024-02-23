import {
  faRobot,
  faSignIn,
  faSignOut,
  faUser,
  faBook,
  faChartLine,
  faEnvelope,
  faHome,
  faInfoCircle,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { signIn, signOut, UserContext } from "../../Auth";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  const [height, setHeight] = useState("calc(100% - 30px)");
  const [isFixed, setFixed] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // sidebar scrolling effect
  const handleScroll = () => {
    // height of the identity bar is 30px
    if (window.scrollY > 30) {
      if (height !== "100%") setHeight("100%");
      setFixed(true);
    } else {
      const d = 30 - window.scrollY;
      setHeight(`calc(100% - ${d}px)`);
      setFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  
  function sendEmail(email = 'vrlee@stanford.edu') {
    window.location.assign("mailto:" + email);
  };

  return (
    <aside
      className={`w-fit bg-plum text-white z-10
        ${isFixed ? "fixed top-0" : "absolute"}`}
      style={{ height }}
    >
      <div className="w-full h-full p-10">
        <ul className="space-y-8 flex flex-col h-full list-none m-0 pl-0">
          {user && (
            <SidebarButton text={"Profile"} path={"/dash/profile"}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName ? user.displayName : "User"}
                  className={`w-26 h-26 rounded-full`}
                />
              ) : (
                <FontAwesomeIcon icon={faUser} className={`w-26 h-26`} />
              )}
            </SidebarButton>
          )}
          <SidebarButton text="Home Page" path="/">
            <FontAwesomeIcon icon={faHome} className={`w-26 h-26`} />
          </SidebarButton>
          <SidebarButton text={"Resources"} path={"/dash/resources"}>
            <FontAwesomeIcon icon={faBook} className={`w-26 h-26`} />
          </SidebarButton>
          <SidebarButton text={"Datamax"} path={"/dash/datamax"}>
            <FontAwesomeIcon icon={faRobot} className={`w-26 h-26`} />
          </SidebarButton>
          {/* <SidebarButton text={"Prompty"} path={"/dash/prompty"}>
            <FontAwesomeIcon icon={faKeyboard} className={`w-26 h-26`} />
          </SidebarButton> */}
          <SidebarButton text={"Analyze"} path={"/dash/analyze"}>
            <FontAwesomeIcon icon={faChartLine} className={`w-26 h-26`} />
          </SidebarButton>

          <li className="flex-1"></li>
          
          <SidebarButton text="Contact" onClick={() => {sendEmail() }}>
            <FontAwesomeIcon icon={faEnvelope} className={`w-26 h-26`} />
          </SidebarButton>          

          <SidebarButton text="About" path="/dash/about">
            <FontAwesomeIcon icon={faInfoCircle} className={`w-26 h-26`} />
          </SidebarButton>
          <SidebarButton
            text={user ? "Sign Out" : "Sign In"}
            onClick={() => {
              if (user) {
                signOut();
                navigate("/dash/resources");
              } else {
                signIn();
              }
            }}
          >
            {user ? (
              <FontAwesomeIcon icon={faSignOut} className={`w-26 h-26`} />
            ) : (
              <FontAwesomeIcon icon={faSignIn} className={`w-26 h-26`} />
            )}
          </SidebarButton>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
