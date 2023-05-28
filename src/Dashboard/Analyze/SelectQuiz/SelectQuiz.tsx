// import { faChartLine } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  documentId,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Auth";
import { QuizDoc } from "../../Datamax/DatamaxTypes";
import Select from "react-select";

const SelectQuiz = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // const [searchTerm, setSearchTerm] = useState("");
  const [pastQuizzes, setPastQuizzes] = useState<{ [key: string]: QuizDoc }>(
    {}
  );

  // get the quizzes that the user has initiated
  useEffect(() => {
    (async () => {
      if (!user || !user.datamax || user.datamax.pastQuizzes.length === 0)
        return;

      const db = getFirestore();
      const dmax = collection(db, "datamax");
      const q = query(
        dmax,
        where(documentId(), "in", user.datamax.pastQuizzes)
      );
      const snapshot = await getDocs(q);

      let quizzes = {};
      snapshot.forEach((doc) => {
        quizzes = { ...quizzes, [doc.id]: doc.data() };
      });

      setPastQuizzes(quizzes);
    })();
  }, [user]);

  // const handleChoice = () => navigate(`/dash/analyze/${searchTerm}`);

  return (
    <div className="w-4/5 relative mt-10">
      <Select
        id="select-quiz"
        className="select-container"
        options={Object.entries(pastQuizzes).map(([joinCode, quiz]) => ({
          value: joinCode,
          label: `${quiz.template.name} (${quiz.createdAt
            .toDate()
            .toLocaleDateString("en-US")})`,
        }))}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: "1.8rem",
            lineHeight: "1.3",
            borderRadius: 0,
            borderColor: "#6b7280",
            "&:hover": {
              borderColor: "#6b7280",
            },
          }),
        }}
        onChange={(e) => {
          if (e) navigate(`/dash/analyze/${e.value}`);
        }}
        placeholder="Search for a game you created"
      />
      {/* <button className="button mt-10" onClick={handleChoice}>
        <FontAwesomeIcon icon={faChartLine} className="mr-10" />
        <span>Analyze</span>
      </button> */}
    </div>
  );
};

export default SelectQuiz;
