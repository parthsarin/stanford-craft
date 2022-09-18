import { faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { loginWithEmailPassword } from "../AuthUtils";

const EmailAndPasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => loginWithEmailPassword(data.email, data.password))}
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
      <div>
        <input
          type="password"
          {...register('password', { required: true })}
          className={`w-full border border-black rounded p-2 mt-2 ${errors.password ? 'border-red-700' : ''}`}
          placeholder="Password"
        />
      </div>
      <div className="flex flex-row">
        <button
          type="submit"
          className="flex-1 rounded border border-indigo-700 text-white py-2 mr-2 bg-indigo-700 hover:bg-indigo-800 mt-2"
        ><FontAwesomeIcon icon={faRightToBracket} className="mr-2" /> Log In</button>
        <button
          className="flex-1 rounded border border-teal-700 text-white py-2 bg-teal-700 hover:bg-teal-800 mt-2"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit((data) => {
              alert('(not implemented yet) sign up flow with data: ' + JSON.stringify(data));
            })();
          }}
        ><FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Sign Up</button>
      </div>
    </form>
  );
}

export default EmailAndPasswordForm;