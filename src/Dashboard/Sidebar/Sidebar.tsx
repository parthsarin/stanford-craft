import { 
  faRobot,
  faSignIn,
  faSignOut,
  faUser,
  faBook,
  faChartLine,
  faQuoteLeft,
  faEnvelope,
  faHome,
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
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <aside
      className={`w-fit bg-violet-500 text-white z-10
        ${isFixed ? "fixed top-0" : "absolute"}`}
      style={{ height }}
    >
      <div className="w-full h-full p-4">
        <ul className="space-y-2 flex flex-col h-full">
          {user && (
            <SidebarButton text={"Profile"} path={"/dash/profile"}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName ? user.displayName : "User"}
                  className={`w-6 h-6 rounded-full`}
                />
              ) : (
                <FontAwesomeIcon icon={faUser} className={`w-6 h-6`} />
              )}
            </SidebarButton>
          )}
          <SidebarButton text="Home Page" path="/">
            <FontAwesomeIcon icon={faHome} className={`w-6 h-6`} />
          </SidebarButton>
          <SidebarButton text={"Resources"} path={"/dash/resources"}>
            <FontAwesomeIcon icon={faBook} className={`w-6 h-6`} />
          </SidebarButton>
          <SidebarButton text={"Datamax"} path={"/dash/datamax"}>
            <FontAwesomeIcon icon={faRobot} className={`w-6 h-6`} />
          </SidebarButton>
          <SidebarButton text={"Analyze"} path={"/dash/analyze"}>
            <FontAwesomeIcon icon={faChartLine} className={`w-6 h-6`} />
          </SidebarButton>

          <li className="flex-1"></li>
          <SidebarButton text="Contact" path="/dash/contact">
            <FontAwesomeIcon icon={faEnvelope} className={`w-6 h-6`} />
          </SidebarButton>
          <SidebarButton text="Credits" path="/dash/credits">
            <FontAwesomeIcon icon={faQuoteLeft} className={`w-6 h-6`} />
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
              <FontAwesomeIcon icon={faSignOut} className={`w-6 h-6`} />
            ) : (
              <FontAwesomeIcon icon={faSignIn} className={`w-6 h-6`} />
            )}
          </SidebarButton>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
