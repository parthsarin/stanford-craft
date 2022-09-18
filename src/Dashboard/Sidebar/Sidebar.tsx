import { faSignOut, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthUser } from "@react-query-firebase/auth";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { signOutAndNotify } from "../../Auth/AuthUtils";

const Sidebar = () => {
  const { isLoading, data: user } = useAuthUser('user', getAuth());

  const navigate = useNavigate();
  if (!isLoading && !user) {
    navigate('/login');
  }

  return (
    <aside className="sm:w-1/5 bg-violet-500 text-white min-h-screen">
      <div className="w-full h-full p-4">
        <ul className="space-y-2 flex flex-col h-full">
          { (!isLoading) && user && (
            <li>
              <button 
                className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
                onClick={() => navigate('/dashboard/profile')}
              >
                <img src={user.photoURL!} alt='user profile' className="mr-2 w-6 h-6 rounded-full" />
                <p className="text-lg">Welcome, { user.displayName?.split(' ')[0] }!</p>
              </button>
            </li>
          )}


          <li>
            <button 
              className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
              onClick={() => navigate('/dashboard/testing')}
            >
              <FontAwesomeIcon icon={faSmile} className="mr-2 w-6 h-6" />
              <p className="text-lg">Testing</p>
            </button>
          </li>

          <li className="flex-1 flex flex-col justify-end">
            <button 
              className="w-full p-2 flex flex-row items-center hover:bg-violet-600 rounded"
              onClick={() => signOutAndNotify(navigate)}
            >
              <FontAwesomeIcon icon={faSignOut} className="mr-2 w-6 h-6" />
              <p className="text-lg">Sign Out</p>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
};

export default Sidebar;