import {
  faArrowLeft,
  faDashboard,
  faHome,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../Auth";

enum Issue {
  NoUser,
  NoAdmin,
}

interface Params {
  issue?: Issue;
}

const AuthWall = ({ issue }: Params) => {
  const navigate = useNavigate();
  if (!issue) issue = Issue.NoUser;

  let msg = "";
  switch (issue) {
    case Issue.NoUser:
      msg = "You must be logged in to view this page.";
      break;
    case Issue.NoAdmin:
      msg = "You do not have permission to view this page.";
      break;
  }

  const showSignIn = issue === Issue.NoUser;

  return (
    <div className="p-20 w-full md:w-2/3">
      <h1 className="mb-20">Inaccessible</h1>

      <p>{msg}</p>

      <div className="w-full mb-0 mt-15 flex flex-row flex-wrap">
        <button className={`button mb-10 mr-10`} onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-10" />
          <span>Go Back</span>
        </button>
        <button
          className={`btn-digital-green mb-10 mr-10`}
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faHome} className="mr-10" />
          <span>Home Page</span>
        </button>
        <button
          className={`btn-plum mb-10 mr-10`}
          onClick={() => navigate("/dash/resources")}
        >
          <FontAwesomeIcon icon={faDashboard} className="mr-10" />
          <span>View the Curricular Resources</span>
        </button>
        {showSignIn && (
          <button className={`btn-archway mb-10 mr-10`} onClick={signIn}>
            <FontAwesomeIcon icon={faSignIn} className="mr-10" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthWall;
export { Issue };
