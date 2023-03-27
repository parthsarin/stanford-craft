import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderInline } from "../../../Generic/Loader";
import { MySwal } from "../../../Generic/Notify";
import { QuizDoc } from "../../Datamax/DatamaxTypes";

const AnalyzeQuiz = () => {
  const { joinCode } = useParams();
  const [quiz, setQuiz] = useState<QuizDoc | null>(null);
  const navigate = useNavigate();

  // load the quiz data
  useEffect(() => {
    if (!joinCode) return;

    (async () => {
      const db = getFirestore();
      const quizRef = doc(db, "datamax", joinCode);
      const quizDoc = await getDoc(quizRef);

      if (quizDoc.exists())
        setQuiz(quizDoc.data() as QuizDoc);
      else {
        MySwal.fire({
          title: "Quiz not found",
          text: "The quiz you are trying to analyze does not exist",
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

  if (!quiz) return <LoaderInline />;
  return (
    <div className="mt-4">
      <h2 className="text-xl">{quiz.template.name}</h2>
      <ul className="text-sm list-disc ml-5 mt-2">
        <li>Created on {quiz.createdAt.toDate().toLocaleDateString("en-US")}</li>
        <li>Join code: {joinCode}</li>
        {quiz.numResponses && <li>Number of responses: {quiz.numResponses}</li>}
      </ul>
      <div className="mt-2 flex flex-row">
        <button
          className="py-2 px-4 rounded rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          onClick={downloadCSV}
        >
          <FontAwesomeIcon icon={faDownload} className="mr-2" />
          Download CSV
        </button>
      </div>
    </div>
  );
}

export default AnalyzeQuiz;