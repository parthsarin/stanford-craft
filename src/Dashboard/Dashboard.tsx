import { useAuthUser } from "@react-query-firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useAuthUser('user', getAuth());

  let msg;
  if (user.isLoading) msg = 'Loading...';
  else if (user.data) msg = 'Signed in as ' + user.data.email;
  else msg = 'Not signed in';

  const navigate = useNavigate();

  return (
    <div>
      <p>{msg}</p>

      <button
        onClick={() => getAuth().signOut().then(() => navigate('/'))}
        className="rounded border border-indigo-700 text-indigo-700 px-3 py-2 hover:bg-indigo-700 hover:text-white mt-2"
      >Sign Out</button>
    </div>
  )
}

export default Dashboard;