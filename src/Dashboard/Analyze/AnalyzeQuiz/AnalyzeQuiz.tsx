import { faChevronLeft, faDownload, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

      if (quizDoc.exists())
        setQuiz(quizDoc.data() as QuizDoc);
      else {
        MySwal.fire({
          title: "Quiz not found",
          text: `I couldn't find a quiz with the code "${code}". Please try again.`,
          icon: "error",
        })
        .then(() => navigate('/dash/analyze'))
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
  }

  const explore = () => {
    if (!joinCode) return;
    const code = joinCode.toUpperCase();
    navigate(`/dash/explore/${code}`);
  }

  if (!quiz) return <LoaderInline />;
  return (
    <div className="mt-4">
      <h2 className="text-xl">{quiz.template.name}</h2>
      <ul className="text-sm list-disc ml-5 mt-2">
        <li>Created on {quiz.createdAt.toDate().toLocaleDateString("en-US")}</li>
        <li>Join code: {joinCode}</li>
        {quiz.numResponses && <li>Number of responses: {quiz.numResponses}</li>}
      </ul>
      <p className="text-sm mt-4 mb-4 italic">
        Download CSV first, and press Explore -- you'll be uploading the CSV in future steps
      </p>
      <div className="mt-2 flex flex-row space-x-2">
        <button
          className="py-2 px-4 rounded rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          onClick={downloadCSV}
        >
          <FontAwesomeIcon icon={faDownload} className="mr-2" />
          Download CSV
        </button>
        <button
          className="py-2 px-4 rounded rounded-md bg-green-600 hover:bg-green-700 text-white"
          onClick={explore}
        >
          <FontAwesomeIcon icon={faChartLine} className="mr-2" />
          Explore 
        </button>
      </div>
      <button
        className="mt-6 py-2 px-4 rounded rounded-md bg-red-600 hover:bg-red-700 text-white"
        onClick={() => navigate('/dash/analyze')}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
        Select a different quiz
      </button>
    </div>
  );
}

export default ExploreQuiz;