import { faHand, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Datamax = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl">Datamax</h1>
      <p className="text-lg italic">
        Generate quizzes with random data elements and aggregate student
        responses in realtime
      </p>

      <div className="flex flex-row my-2">
        <button
          className="btn-rose"
          onClick={() => navigate("/dash/datamax/new")}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          New Quiz
        </button>
        <button
          className="btn-indigo"
          onClick={() => navigate("/dash/datamax/join")}
        >
          <FontAwesomeIcon icon={faHand} className="mr-2" />
          Join Game
        </button>
      </div>
    </div>
  );
}

export default Datamax;