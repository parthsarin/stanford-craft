import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../Auth";
import Loader from "../../../Generic/Loader";
import { MySwal } from "../../../Generic/Notify";
import { QuizDoc } from "../DatamaxTypes";
import StudentView from "./StudentView";
import TeacherView from "./TeacherView";


const JoinQuiz = () => {
  const { joinCode } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // get the quiz information to make sure it exists
  useEffect(() => {
    if (!joinCode) return;

    (async () => {
      const db = getFirestore();
      const docRef = doc(db, "datamax", joinCode);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const quizData = docSnap.data() as QuizDoc;
        setQuiz(quizData);
        setLoading(false);

        if (!quizData.active)
          setError("The quiz you are trying to join is not active.");
      } else {
        setError("The quiz you are trying to join does not exist.");
      }

    })();
  }, [joinCode]);

  if (error) {
    MySwal.fire({
      title: "Error",
      text: error,
      icon: "error"
    })
      .then(() => navigate('/dash/datamax'));
    return null;
  }
  if (loading || !joinCode) return <Loader />;
  if (quiz && user && user.uid === quiz.owner) 
    return <TeacherView joinCode={joinCode} quiz={quiz} />;

  return <StudentView joinCode={joinCode} />;
}

export default JoinQuiz;