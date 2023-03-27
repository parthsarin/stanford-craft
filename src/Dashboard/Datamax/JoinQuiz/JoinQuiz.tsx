import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../Auth";
import Loader from "../../../Generic/Loader";
import { MySwal } from "../../../Generic/Notify";
import NoMatch from "../../../NoMatch";
import { QuizDoc } from "../DatamaxTypes";
import StudentView from "./StudentView";
import TeacherView from "./TeacherView";


const JoinQuiz = () => {
  const { joinCode } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // get the quiz information to make sure it exists
  useEffect(() => {
    if (!joinCode) return;

    (async () => {
      const db = getFirestore();
      const docRef = doc(db, "datamax-active", joinCode);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const quizData = docSnap.data() as QuizDoc;
        setQuiz(quizData);
        setLoading(false);
      } else {
        setError(true);
      }

    })();
  }, [joinCode]);

  if (error) {
    MySwal.fire({
      title: "Error",
      text: "The quiz you are trying to join does not exist.",
      icon: "error"
    })
      .then(() => navigate('/dash/datamax'));
    return null;
  }
  if (loading || !joinCode) return <Loader />;
  if (user?.uid === quiz?.owner) return <TeacherView joinCode={joinCode} />;
  return <StudentView joinCode={joinCode} />;
}

export default JoinQuiz;