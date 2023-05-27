import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Auth";
import Loader from "../../Generic/Loader";
import { MySwal } from "../../Generic/Notify";
import PhotoSelector from "./PhotoSelector";
import { ScrollRestoration } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [updateUser, setUpdateUser] = useState<typeof user>(null);
  useEffect(() => setUpdateUser(user), [user, setUpdateUser]);

  if (!updateUser) return <Loader />;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setUser(updateUser);
      MySwal.fire({
        title: "Success!",
        text: "Your profile has been updated.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      MySwal.fire({
        title: "Error!",
        text: "There was an error updating your profile.",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-20 w-full md:w-2/3 xl:w-1/2">
      <h1 className="mb-0">
        Welcome, {updateUser.displayName?.split(" ")[0]}! 👋🏽
      </h1>

      <p>Update your information:</p>
      <form
        className="flex flex-col bg-stone text-white w-full p-20"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-3">
          <label htmlFor="displayName" className="font-bold">
            Name
          </label>
          <div className="col-span-3 sm:col-span-2 mb-26">
            <input
              type="text"
              name="displayName"
              value={updateUser.displayName ? updateUser.displayName : ""}
              className="input w-full p-10 rounded bg-stone-dark text-white"
              onChange={(e) =>
                setUpdateUser({ ...updateUser, displayName: e.target.value })
              }
            />
          </div>
          <label htmlFor="displayName" className="font-bold">
            Affiliation
          </label>
          <div className="col-span-3 sm:col-span-2 mb-26">
            <input
              type="text"
              name="affiliation"
              value={updateUser.affiliation ? updateUser.affiliation : ""}
              className="input w-full p-10 rounded bg-stone-dark text-white"
              onChange={(e) =>
                setUpdateUser({ ...updateUser, affiliation: e.target.value })
              }
            />
          </div>
          <label htmlFor="photo" className="font-bold">
            Photo
          </label>
          <div className="col-span-3 sm:col-span-2 flex flex-row justify-around mb-12">
            <div className="flex-col justify-center">
              <img
                src={updateUser.photoURL ? updateUser.photoURL : ""}
                alt={updateUser.displayName ? updateUser.displayName : "User"}
                className="w-160 h-160 rounded-full mx-auto"
              />
              <p className="text-md text-center">current photo</p>
            </div>
            <div className="flex-col justify-center">
              <PhotoSelector
                className="w-160 h-160 mx-auto rounded-full"
                onPhotoSelected={(photoURL) => {
                  setUpdateUser({ ...updateUser, photoURL });
                  setUser(updateUser);
                }}
              />
              <p className="text-md text-center">click or drag to upload</p>
            </div>
          </div>
        </div>

        <button type="submit" className="col-span-3 button">
          Update Profile
        </button>
      </form>
      <ScrollRestoration />
    </div>
  );
};

export default Profile;
