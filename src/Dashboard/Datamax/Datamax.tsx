import { faHand, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import { UserContext } from "../../Auth";
import { useProtectedNav } from "../../Auth/NavUtils";
import { LoaderInline } from "../../Generic/Loader";
import { MySwal } from "../../Generic/Notify";
import { QuizDoc, QuizPreviewCardProps } from "./DatamaxTypes";
import QuizPreviewCard from "./QuizPreviewCard";
import usePageTracking from "../../Generic/usePageTracking";

const Datamax = () => {
  usePageTracking();
  const navigate = useNavigate();
  const protectedNav = useProtectedNav();
  const { user } = useContext(UserContext);

  const [quizzesLoaded, setQuizzesLoaded] = useState(false);
  const [activeQuizzes, setActiveQuizzes] = useState<QuizPreviewCardProps[]>(
    []
  );
  const [pastQuizzes, setPastQuizzes] = useState<QuizPreviewCardProps[]>([]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      // Get the active quizzes
      const aqCodeList = userDoc.data()?.datamax?.activeQuizzes || [];
      const activeQuizzes = [];
      for (const code of aqCodeList) {
        const quizRef = doc(db, "datamax", code);
        const quizDoc = await getDoc(quizRef);

        activeQuizzes.push({
          quiz: quizDoc.data() as QuizDoc,
          joinCode: code,
          createdAt: quizDoc.data()?.createdAt,
        });
      }
      setActiveQuizzes(activeQuizzes);

      // get past quizzes in the same way
      const pqCodeList = userDoc.data()?.datamax?.pastQuizzes || [];
      const pastQuizzes = [];
      for (const code of pqCodeList) {
        const quizRef = doc(db, "datamax", code);
        const quizDoc = await getDoc(quizRef);

        pastQuizzes.push({
          quiz: quizDoc.data() as QuizDoc,
          joinCode: code,
          createdAt: quizDoc.data()?.createdAt,
        });
      }
      setPastQuizzes(pastQuizzes);

      setQuizzesLoaded(true);
    })();
  }, [user, setActiveQuizzes, setPastQuizzes]);

  const joinGame = () => {
    MySwal.fire({
      title: "Join a game",
      input: "text",
      inputLabel: "Enter the game code",
      inputPlaceholder: "ABCDEF",
      inputAttributes: {
        autocapitalize: "on",
      },
      showCancelButton: true,
      confirmButtonText: "Join",
      showLoaderOnConfirm: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          return result.value;
        }
      })
      .then((code) => {
        if (code) {
          navigate(`/dash/datamax/quiz/${code.toUpperCase()}`);
        }
      });
  };

  return (
    <div className="p-20">
      <h1 className="mb-0">Datamax</h1>
      <p className="italic">
        Generate quizzes with random data elements and aggregate student
        responses in realtime
      </p>

      <div className="flex flex-row mb-10">
        <button
          className="btn-digital-red mr-10"
          onClick={() => protectedNav("/dash/datamax/new")}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-10" />
          <span>New Game</span>
        </button>
        <button className="btn-palo-verde" onClick={joinGame}>
          <FontAwesomeIcon icon={faHand} className="mr-10" />
          <span>Join Game</span>
        </button>
      </div>

      {quizzesLoaded ? (
        <>
          <div className="mt-6">
            <h2 className="type-2">Active games</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-20">
              {activeQuizzes.map((props, i) => (
                <QuizPreviewCard {...props} key={props.joinCode} />
              ))}
            </div>
          </div>
          <div className="mt-2">
            <h2 className="type-2">Past games</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {pastQuizzes.map((props, i) => (
                <QuizPreviewCard {...props} key={props.joinCode} />
              ))}
            </div>
          </div>
        </>
      ) : (
        user && <LoaderInline />
      )}
      <ScrollRestoration />
    </div>
  );
};

export default Datamax;
