import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

const ContinueButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className={`rounded border border-fuchsia-700 bg-fuchsia-700 text-white
        px-3 py-2 hover:bg-fuchsia-800
        `}
      onClick={() => navigate("/dashboard")}
    >
      <FontAwesomeIcon icon={faDashboard} className="mr-2" /> Dashboard
    </button>
  );
}

export default ContinueButton;