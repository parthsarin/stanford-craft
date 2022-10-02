import { faHand, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthUser } from "@react-query-firebase/auth";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderInline } from "../../Generic/Loader";
import { QuizPreviewCardProps, QuizTemplate } from "./DatamaxTypes";
import QuizPreviewCard from "./QuizPreviewCard";

const Datamax = () => {
  const navigate = useNavigate();
  
  const { isLoading, data: user } = useAuthUser(['user'], getAuth());

  const [quizzesLoaded, setQuizzesLoaded] = useState(false);
  const [activeQuizzes, setActiveQuizzes] = useState<QuizPreviewCardProps[]>([]);

  useEffect(() => {
    if (isLoading || !user) return;

    (async () => {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      // Get the active quizzes
      const aqCodeList = userDoc.data()?.datamax.activeQuizzes || [];
      const activeQuizzes = [];
      for (const code of aqCodeList) {
        const quizRef = doc(db, 'datamax-active', code);
        const quizDoc = await getDoc(quizRef);
        
        activeQuizzes.push({
          quiz: quizDoc.data()?.template as QuizTemplate,
          joinCode: code,
          createdAt: quizDoc.data()?.createdAt,
        });
      }
      setActiveQuizzes(activeQuizzes);
      
      // Todo: get past quizzes
      // const pqCodeList = userDoc.data()?.datamax.pastQuizzes || [];

      setQuizzesLoaded(true);
    })();
  }, [isLoading, user, setActiveQuizzes]); 

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
          onClick={() => navigate("/dashboard/datamax/new")}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          New Quiz
        </button>
        <button
          className="btn-indigo"
          onClick={() => navigate("/dashboard/datamax/join")}
        >
          <FontAwesomeIcon icon={faHand} className="mr-2" />
          Join Game
        </button>
      </div>

      {quizzesLoaded ? (
        <>
          <div className="mt-2">
            <h2 className="text-xl mb-1">Active quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeQuizzes.map((props, i) => (
                <QuizPreviewCard {...props} key={`active-quiz-${i}`} />
              ))}
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-xl mb-1">Past quizzes</h2>
          </div>
        </>
      ) : (
        <LoaderInline />
      )}
    </div>
  );
}

export default Datamax;