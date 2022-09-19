import { faDashboard, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useNavigate } from "react-router-dom";
import { useAuthUser } from "@react-query-firebase/auth";
import { getAuth } from "firebase/auth";

const ContinueButton = () => {
  const { isLoading, data: user } = useAuthUser('user', getAuth());
  const navigate = useNavigate();

  return (
    <>
      { (!isLoading) && (!user) 
      && <button
        className={
        `rounded border border-indigo-700 bg-indigo-700 text-white
        px-3 py-2 hover:bg-indigo-800
        `}
        onClick={() => navigate('/login')}
      >
        <FontAwesomeIcon icon={faRightToBracket} className="mr-2" /> Log In
      </button>}
      { (!isLoading) && (user)
      && <button
        className={
        `rounded border border-fuchsia-700 bg-fuchsia-700 text-white
        px-3 py-2 hover:bg-fuchsia-800
        `}
        onClick={() => navigate('/dashboard')}
      >
        <FontAwesomeIcon icon={faDashboard} className="mr-2" /> Dashboard
      </button>
      }
    </>
  )
}

export default ContinueButton;