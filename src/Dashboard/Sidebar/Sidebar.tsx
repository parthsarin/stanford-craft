import { faChartArea, faChevronLeft, faChevronRight, faRobot, faSignOut, faUser, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthUser } from "@react-query-firebase/auth";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { signOutAndNotify } from "../../Auth/AuthUtils";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const { isLoading, data: user } = useAuthUser('user', getAuth());
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
    <aside className="sm:w-fit bg-violet-500 text-white min-h-screen">
      <div className="w-full h-full p-4">
        <ul className="space-y-2 flex flex-col h-full">
          { (!isLoading) && user && (
            <li>
              <button 
                className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
                onClick={() => navigate('/dashboard/profile')}
              >
                {
                  user.photoURL
                  ? <img src={user.photoURL} alt='user profile' className={`${expanded && 'mr-2'} w-6 h-6 rounded-full`} />
                  : <FontAwesomeIcon icon={faUser} className={`${expanded && 'mr-2'} w-6 h-6`} />
                }
                {expanded && <p className="text-lg">Welcome{ user.displayName && `, ${user.displayName?.split(' ')[0]}` }!</p>}
              </button>
            </li>
          )}
          
          <li>
            <button 
              className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
              onClick={() => navigate('/dashboard/datamax')}
            >
              <FontAwesomeIcon icon={faRobot} className={`${expanded && 'mr-2'} w-6 h-6`} />
              {expanded && <p className="text-lg">Datamax</p>}
            </button>
          </li>
          <li>
            <button 
              className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
              onClick={() => navigate('/dashboard/visualize')}
            >
              <FontAwesomeIcon icon={faChartArea} className={`${expanded && 'mr-2'} w-6 h-6`} />
              {expanded && <p className="text-lg">Visualizer</p>}
            </button>
          </li>
          <li>
            <button 
              className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
              onClick={() => navigate('/dashboard/resources')}
            >
              <FontAwesomeIcon icon={faBookmark} className={`${expanded && 'mr-2'} w-6 h-6`} />
              {expanded && <p className="text-lg">Resources</p>}
            </button>
          </li>

          <li className="flex-1"></li>
          <li>
            <button 
              className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
              onClick={() => signOutAndNotify(navigate)}
            >
              <FontAwesomeIcon icon={faSignOut} className={`${expanded && 'mr-2'} w-6 h-6`} />
              {expanded && <p className="text-lg">Sign Out</p>}
            </button>
          </li>
          <li>
            <button 
              className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
              onClick={toggleExpanded}
            >
              { expanded
              ? <FontAwesomeIcon icon={faChevronLeft} className={`${expanded && 'mr-2'} w-6 h-6`} />
              : <FontAwesomeIcon icon={faChevronRight} className={`${expanded && 'mr-2'} w-6 h-6`} />}
              { expanded && <p className="text-lg">Collapse</p>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
};

export default Sidebar;
