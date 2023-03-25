import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Auth";
import Loader from "../../Generic/Loader";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [updateUser, setUpdateUser] = useState<typeof user>(null);
  useEffect(() => setUpdateUser(user), [user, setUpdateUser]);

  if (!user) return <Loader />;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-6">
        Welcome, {updateUser?.displayName?.split(" ")[0]}! 👋🏽
      </h1>

      {/* create a form to update the user's display name or image */}
      <p className="text-lg mb-3">Update your information:</p>
      <form className="flex flex-col">
        <div className="flex flex-row">
          <label htmlFor="displayName">Display Name</label>
          <div>
            <input
              type="text"
              name="displayName"
              value={updateUser?.displayName ? updateUser.displayName : ""}
              onChange={(e) =>
                setUpdateUser({ ...updateUser!, displayName: e.target.value })
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;