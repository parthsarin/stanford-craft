import { 
  faChevronLeft,
  faChevronRight,
  faRobot,
  faSignIn,
  faSignOut,
  faUser,
  faBook,
  faChartLine,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { signIn, signOut, UserContext } from "../../Auth";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  const [height, setHeight] = useState("calc(100% - 30px)");
  const [isFixed, setFixed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // sidebar expand/collapse effect
  const toggleExpanded = () => {
    setExpanded(!expanded);
    localStorage.setItem('AILitSidebarExpanded', JSON.stringify(!expanded));
  }

  useEffect(() => {
    const ls = localStorage.getItem('AILitSidebarExpanded');
    if (ls && ls === 'true') setExpanded(true);
    if (ls && ls === 'false') setExpanded(false);
  }, [setExpanded]);

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
            <SidebarButton
              text={"Profile"}
              path={"/dash/profile"}
              expanded={expanded}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName ? user.displayName : "User"}
                  className={`${expanded && "mr-2"} w-6 h-6 rounded-full`}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  className={`${expanded && "mr-2"} w-6 h-6`}
                />
              )}
            </SidebarButton>
          )}
          <SidebarButton
            text={"Datamax"}
            path={"/dash/datamax"}
            expanded={expanded}
          >
            <FontAwesomeIcon
              icon={faRobot}
              className={`${expanded && "mr-2"} w-6 h-6`}
            />
          </SidebarButton>
          <SidebarButton
            text={"Resources"}
            path={"/dash/resources"}
            expanded={expanded}
          >
            <FontAwesomeIcon
              icon={faBook}
              className={`${expanded && "mr-2"} w-6 h-6`}
            />
          </SidebarButton>
          <SidebarButton
            text={"Analyze"}
            path={"/dash/analyze"}
            expanded={expanded}
          >
            <FontAwesomeIcon
              icon={faChartLine}
              className={`${expanded && "mr-2"} w-6 h-6`}
            />
          </SidebarButton>

          <li className="flex-1"></li>
          <SidebarButton text={"Credits"} path={"/dash/credits"} expanded={expanded}>
            <FontAwesomeIcon icon={faQuoteLeft} className={`${expanded && "mr-2"} w-6 h-6`} />
          </SidebarButton>
          <li>
            <button
              className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
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
                <FontAwesomeIcon
                  icon={faSignOut}
                  className={`${expanded && "mr-2"} w-6 h-6`}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faSignIn}
                  className={`${expanded && "mr-2"} w-6 h-6`}
                />
              )}
              {user
                ? expanded && <p className="text-lg">Sign Out</p>
                : expanded && <p className="text-lg">Sign In</p>}
            </button>
          </li>
          <li>
            <button
              className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
              onClick={toggleExpanded}
            >
              {expanded ? (
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className={`${expanded && "mr-2"} w-6 h-6`}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={`${expanded && "mr-2"} w-6 h-6`}
                />
              )}
              {expanded && <p className="text-lg">Collapse</p>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
