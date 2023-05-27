import {
  faArrowLeft,
  faDashboard,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { getBackground } from "../Generic/Background";

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
      <div className="rounded w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 bg-white/60 border border-black p-20 sm:p-30 backdrop-blur-sm text-center m-3">
        <h1 className="type-1 font-bold font-serif mb-0">
          404: Page Not Found
        </h1>
        <div className="w-full border-t border-gray-500 mb-10 mt-10"></div>
        <p className="type-0 mb-10">We couldn't find that page...</p>
        <div className="w-full mb-0 mt-15 flex flex-row justify-around flex-wrap">
          <button
            className={`rounded border border-digital-red bg-digital-red text-white
            px-10 py-8 hover:bg-digital-red-dark mb-10
            `}
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-10" /> Go Back
          </button>
          <button
            className={`rounded border border-digital-green bg-digital-green text-white
            px-10 py-8 hover:bg-digital-green-dark mb-10
            `}
            onClick={() => navigate("/")}
          >
            <FontAwesomeIcon icon={faHome} className="mr-10" /> Home Page
          </button>
          <button
            className={`rounded border border-plum bg-plum text-white
            px-10 py-8 hover:bg-plum-dark mb-10
            `}
            onClick={() => navigate("/dash/resources")}
          >
            <FontAwesomeIcon icon={faDashboard} className="mr-10" /> View the
            Curricular Resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
