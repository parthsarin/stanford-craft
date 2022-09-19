import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, isSignInWithEmailLink } from "firebase/auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { callbackSignInLink, sendSignInLink } from "../AuthUtils";

const EmailSignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const auth = getAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      callbackSignInLink()
        .then(() => navigate('/dashboard'))
    }
  }, [auth, navigate]);

  return (
    <form
      onSubmit={handleSubmit((data) => sendSignInLink(data.email))}
      className="flex flex-col mt-4"
    >
      <div>
        <input
          type="email"
          {...register('email', { required: true })}
          className={`w-full border border-black rounded p-2 ${errors.email ? 'border-red-700' : ''}`}
          placeholder="Email"
        />
      </div>
      <div className="flex flex-row">
        <button
          type="submit"
          className="flex-1 rounded border border-indigo-700 text-white py-2 mr-2 bg-indigo-700 hover:bg-indigo-800 mt-2"
        ><FontAwesomeIcon icon={faLink} className="mr-2" /> Get Log In Link</button>
        </div>
    </form>
  );
}

export default EmailSignInForm;