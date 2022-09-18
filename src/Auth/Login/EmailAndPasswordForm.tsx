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
      <button
        type="submit"
        className="rounded border border-indigo-700 text-indigo-700 px-3 py-2 hover:bg-indigo-700 hover:text-white mt-2"
      >Submit</button>
    </form>
  );
}

export default EmailAndPasswordForm;