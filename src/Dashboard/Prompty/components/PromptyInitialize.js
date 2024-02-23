import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PromptyInitialize = () => {
  const navigate = useNavigate();

  const joinPrompty = () => {
    navigate("/dash/prompty/play");
  };

  return (
    <>
      <p>Experience and analyze prompting with Prompty</p>
      <button className="btn-digital-red mr-10" onClick={() => joinPrompty()}>
        <FontAwesomeIcon icon={faPlus} className="mr-10" />
        <span>Start Prompty</span>
      </button>
    </>
  );
};

export default PromptyInitialize;
