import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { getBackground } from "../Generic/Background";
import ContinueButton from "../Home/ContinueButton";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-full flex items-center justify-center fixed top-0"
      style={{
        backgroundImage: `url(${getBackground()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="rounded w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 bg-white/50 border border-black p-5 sm:p-10 backdrop-blur-sm text-center m-5">
        <h1 className="text-2xl font-bold mb-3">404</h1>
        <div className="w-full border-t border-gray-500 mb-3"></div>
        <p className="type-1 mb-3">We couldn't find that page...</p>
        <div className="w-full mb-0">
          <button
            className={`rounded border border-rose-700 bg-rose-700 text-white
          px-3 py-2 hover:bg-rose-800 mr-2
          `}
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Go Back
          </button>
          <button
            className={`rounded border border-teal-700 bg-teal-700 text-white
          px-3 py-2 hover:bg-teal-800 mr-2
          `}
            onClick={() => navigate("/")}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Home Page
          </button>
          <ContinueButton />
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
