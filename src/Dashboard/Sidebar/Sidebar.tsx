import { faChevronLeft, faChevronRight, faRobot, faBookmark, faSignIn, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { signIn, signOut, UserContext } from "../../Auth";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleExpanded = () => {
    setExpanded(!expanded);
    localStorage.setItem('AILitSidebarExpanded', JSON.stringify(!expanded));
  }

  useEffect(() => {
    const ls = localStorage.getItem('AILitSidebarExpanded');
    if (ls && ls === 'true') setExpanded(true);
    if (ls && ls === 'false') setExpanded(false);
  }, [setExpanded]);

  return (
    <aside
      className="sm:w-fit bg-violet-500 text-white"
      style={{ minHeight: "97vh" }}
    >
      <div className="w-full h-full p-4">
        <ul className="space-y-2 flex flex-col h-full">
          {user && (
            <li>
              <button
                className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
                onClick={() => navigate("/dash/profile")}
              >
                {
                  user.photoURL
                  ? (<img
                      src={user.photoURL}
                      alt={user.displayName ? user.displayName : "User"}
                      className={`${expanded && "mr-2"} w-6 h-6 rounded-full`}
                    />)
                  : (<FontAwesomeIcon
                      icon={faUser}
                      className={`${expanded && "mr-2"} w-6 h-6`}
                    />)
                }
                {expanded && <p className="text-lg">Profile</p>}
              </button>
            </li>
          )}
          <li>
            <button
              className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
              onClick={() => navigate("/dash/datamax")}
            >
              <FontAwesomeIcon
                icon={faRobot}
                className={`${expanded && "mr-2"} w-6 h-6`}
              />
              {expanded && <p className="text-lg">Datamax</p>}
            </button>
          </li>
          <li>
            <button
              className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
              onClick={() => navigate("/dash/resources")}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                className={`${expanded && "mr-2"} w-6 h-6`}
              />
              {expanded && <p className="text-lg">Resources</p>}
            </button>
          </li>

          <li className="flex-1"></li>
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
