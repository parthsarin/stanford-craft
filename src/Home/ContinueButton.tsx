import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ContinueButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="button w-full"
      // className={`rounded border border-plum bg-plum text-white
      //   px-10 py-8 hover:bg-plum-dark w-full type-0
      //   `}
      onClick={() => navigate("/dash/resources")}
    >
      <FontAwesomeIcon icon={faDashboard} className="mr-10" /> View the
      Curricular Resources
    </button>
  );
};

export default ContinueButton;
