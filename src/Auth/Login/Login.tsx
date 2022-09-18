import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { getBackground } from "../../Generic/Background";
import { loginWithGoogle } from "../AuthUtils";
import EmailAndPasswordForm from "./EmailAndPasswordForm";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full h-full flex items-center justify-center fixed top-0"
      style={{
        backgroundImage: `url(${getBackground()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="rounded rounded-md w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 bg-white/50 border border-black p-5 sm:p-10 backdrop-blur-sm text-center m-5"
      >
        <h1 className="text-2xl font-bold">Log In</h1>
        <EmailAndPasswordForm />
        <div className="flex flex-row my-4 items-center">
          <div className="border-t border-black flex-1"></div>
          <div className="mx-4">or</div>
          <div className="border-t border-black flex-1"></div>
        </div>
        <button
          className="rounded w-full border border-rose-700 text-white px-3 py-2 bg-rose-700 hover:bg-rose-800"
          onClick={() => loginWithGoogle().then(() => navigate('/dashboard'))}
        >
          <div className="flex flex-row w-full">
            <div><FontAwesomeIcon icon={faGoogle} /></div>
            <div className="flex-1">Sign In with Google</div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Login;