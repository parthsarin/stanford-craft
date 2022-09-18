import { useAuthUser } from "@react-query-firebase/auth";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { isLoading, data: user } = useAuthUser('user', getAuth());
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  if (isLoading) return null;
  if (!user) navigate('/login');
  
  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl">Profile information</h1>

      <form 
        onSubmit={handleSubmit((data) => updateProfile(user!, data).then(() => navigate(0)))}
      >
        <div className="flex flex-col mt-2">
          <label className="text-lg" htmlFor="displayName">Name</label>
          <input
            type="text"
            defaultValue={user!.displayName!}
            className={`w-1/2 border border-black rounded px-2 py-1 ${errors.displayName ? 'border-red-700' : ''}`}
            {...register('displayName', { required: true })}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-lg" htmlFor="photoURL">Photo URL</label>
          <input
            type="text"
            defaultValue={user!.photoURL!}
            className="w-1/2 border border-black rounded px-2 py-1"
            {...register('photoURL', { required: false })}
          />
        </div>
        <div className="flex flex-col mt-4">
          <button
            type="submit"
            className="rounded w-fit border border-indigo-700 text-white px-4 py-2 bg-indigo-700 hover:bg-indigo-800"
          ><FontAwesomeIcon icon={faUser} className="mr-2" /> Update Profile</button>
        </div>
      </form>
    </div>
  )
}

export default Profile;