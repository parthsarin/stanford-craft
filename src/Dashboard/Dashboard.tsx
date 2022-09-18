import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  let msg;
  if (user) msg = 'Signed in as ' + user.email;
  else msg = 'Not signed in';

  return (
    <div>
      <p>{msg}</p>

      <button
        onClick={() => auth.signOut().then(() => navigate('/'))}
        className="rounded border border-indigo-700 text-indigo-700 px-3 py-2 hover:bg-indigo-700 hover:text-white mt-2"
      >Sign Out</button>
    </div>
  )
}

export default Dashboard;