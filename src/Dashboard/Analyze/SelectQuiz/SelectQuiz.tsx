import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, documentId, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Auth";
import { QuizDoc } from "../../Datamax/DatamaxTypes";
import match from "./SearchUtils";
import styles from "./SelectQuiz.module.css";

const SelectQuiz = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [pastQuizzes, setPastQuizzes] = useState<{[key: string]: QuizDoc}>({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{[key: string]: QuizDoc}>({});

  // get the quizzes that the user has initiated
  useEffect(() => {
    (async () => {
      if (!user || !user.datamax || user.datamax.pastQuizzes.length === 0)
        return;

      const db = getFirestore();
      const dmax = collection(db, "datamax");
      const q = query(dmax, where(documentId(), "in", user.datamax.pastQuizzes));
      const snapshot = await getDocs(q);

      let quizzes = {};
      snapshot.forEach((doc) => {
        quizzes = {...quizzes, [doc.id]: doc.data()};
      });

      setPastQuizzes(quizzes);
      setSuggestions(quizzes);
    })();
  }, [user]);

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // apply the match function to the past quizzes
    const matches = Object
                      .entries(pastQuizzes)
                      .filter(([joinCode, quiz]) => match(e.target.value, { ...quiz, joinCode }));
    setSuggestions(Object.fromEntries(matches));
  }

  return (
    <div className="flex flex-row items-start justify-start w-4/5 relative mt-4">
      <input
        type="text"
        className={styles.input}
        placeholder="Search for a game you created"
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        value={searchTerm}
        onChange={handleType}
      />
      <div
        className={`${showSuggestions ? "absolute" : "hidden"} ${
          styles.dropdown
        }`}
      >
        <ul aria-label="options">
          {
          Object.entries(suggestions)
            .map(([joinCode, quiz]) => ({ ...quiz, joinCode }))
            .map((q) => (
              <li key={q.joinCode}>
                <button onMouseDown={() => navigate(`/dash/analyze/${q.joinCode}`)}>
                  <p className="inline-block text-md">{q.template.name}</p>
                  <p className="inline-block text-sm">
                    {q.joinCode} ({q.createdAt.toDate().toLocaleDateString("en-US")})
                  </p>
                </button>
              </li>
            ))
          }
          { Object.values(suggestions).length === 0 && (
            <li className="px-3 py-1 text-lg">You don't own a quiz with that code (press "Analyze" to search the entire database)</li>
          )}
        </ul>
      </div>
      <button 
        className="ml-6 px-3 py-1 text-lg bg-red-600 text-white hover:bg-red-700 rounded rounded-md"
        onClick={() => navigate(`/dash/analyze/${searchTerm}`)}
      >
        <FontAwesomeIcon
          icon={faChartLine}
          className="mr-2"
        />
        Analyze
      </button>
    </div>
  );
}

export default SelectQuiz;