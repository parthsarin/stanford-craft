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
    navigate(`/dash/analyze/${code}`);
  }

  if (!quiz) return <LoaderInline />;
  return (
    <div className="mt-4">
      <iframe width="100%" height="500" src="https://observablehq.com/embed/021fd59ef42a475a?cell=*"></iframe>
    </div>
  );
}

export default AnalyzeQuiz;