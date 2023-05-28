import {
  faChevronLeft,
  faDownload,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import { LoaderInline } from "../../../Generic/Loader";
import { MySwal } from "../../../Generic/Notify";
import { QuizDoc } from "../../Datamax/DatamaxTypes";

const ExploreQuiz = () => {
  const { joinCode } = useParams();
  const [quiz, setQuiz] = useState<QuizDoc | null>(null);
  const navigate = useNavigate();

  // load the quiz data
  useEffect(() => {
    if (!joinCode) return;

    (async () => {
      const code = joinCode.toUpperCase();
      const db = getFirestore();
      const quizRef = doc(db, "datamax", code);
      const quizDoc = await getDoc(quizRef);

      if (quizDoc.exists()) setQuiz(quizDoc.data() as QuizDoc);
      else {
        MySwal.fire({
          title: "Quiz not found",
          text: `I couldn't find a quiz with the code "${code}". Please try again.`,
          icon: "error",
        }).then(() => navigate("/dash/analyze"));
      }
    })();
  }, [joinCode, navigate]);

  const downloadCSV = () => {
    if (!quiz || !quiz.csv) return;

    const csvData = quiz.csv;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `${quiz.template.name}.csv`);
    link.click();
  };

  const explore = () => {
    if (!joinCode) return;
    const code = joinCode.toUpperCase();
    navigate(`/dash/explore/${code}`);
  };

  if (!quiz) return <LoaderInline />;
  return (
    <div className="mt-4">
      <h2 className="type-2">{quiz.template.name}</h2>
      <ul className="type-0 list-disc ml-5 mt-2">
        <li>
          Created on {quiz.createdAt.toDate().toLocaleDateString("en-US")}
        </li>
        <li>Join code: {joinCode}</li>
        {quiz.numResponses && <li>Number of responses: {quiz.numResponses}</li>}
      </ul>
      <p className="type-0 mt-4 mb-4 italic">
        Download CSV first, and press Explore -- you'll be uploading the CSV in
        future steps
      </p>
      <div className="mt-10 flex flex-row">
        <button className="btn-digital-blue mr-10 mb-10" onClick={downloadCSV}>
          <FontAwesomeIcon icon={faDownload} className="mr-10" />
          <span>Download CSV</span>
        </button>
        <button className="btn-digital-green mr-10 mb-10" onClick={explore}>
          <FontAwesomeIcon icon={faChartLine} className="mr-10" />
          <span>Explore</span>
        </button>
        <button
          className="button mr-10 mb-10"
          onClick={() => navigate("/dash/analyze")}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-10" />
          <span>Select a different game</span>
        </button>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default ExploreQuiz;
