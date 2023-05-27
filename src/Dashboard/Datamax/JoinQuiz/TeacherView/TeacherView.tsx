import {
  faStopwatch,
  faTrash,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../Generic/Loader";
import { MySwal } from "../../../../Generic/Notify";
import { QuizDoc, Response as QuizResponse } from "../../DatamaxTypes";

interface Params {
  joinCode: string;
  quiz: QuizDoc;
}

const TeacherView = ({ joinCode, quiz }: Params) => {
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<{ [key: string]: QuizResponse }>(
    {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "datamax", joinCode, "responses"));
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const id = change.doc.id;
        const type = change.type;
        const data = change.doc.data() as QuizResponse;

        if (type === "added" || type === "modified") {
          setResponses((prev) => ({ ...prev, [id]: data }));
        } else if (type === "removed") {
          setResponses((prev) => {
            delete prev[id];
            return { ...prev };
          });
        }
      });
    });

    return unsub;
  }, [joinCode]);

  const handleDelete = (id: string) => () => {
    MySwal.fire({
      title: "Are you sure?",
      text: `This will permanently delete ${responses[id].name}'s response from the database.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const db = getFirestore();
        const docRef = doc(db, "datamax", joinCode, "responses", id);
        deleteDoc(docRef);
      }
    });
  };

  const handleEndQuiz = async () => {
    setLoading(true);
    const functions = getFunctions();
    const endQuiz = httpsCallable(functions, "endQuiz");

    let res;
    try {
      res = await endQuiz({ joinCode });
    } catch (e: any) {
      MySwal.fire({
        title: "Error",
        text: "An error occurred while ending the quiz. Please try again.",
        icon: "error",
        footer: e.message,
      });
      setLoading(false);
      return;
    }
    const data: any = res.data;
    setLoading(false);
    if (data.success) {
      navigate("/dash/datamax");
    }
  };

  const handleDeleteQuiz = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "This action is irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const db = getFirestore();
        const quizDocRef = doc(db, "datamax", joinCode);
        await deleteDoc(quizDocRef);

        const userDocRef = doc(db, "users", quiz.owner);
        await updateDoc(userDocRef, {
          "datamax.activeQuizzes": arrayRemove(joinCode),
          "datamax.pastQuizzes": arrayRemove(joinCode),
        });

        navigate("/dash/datamax");
      }
    });
  };

  return (
    <div className="p-4 w-full lg:w-2/3">
      {loading && <Loader />}
      <h1 className="text-2xl mb-4">{quiz.template.name}</h1>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col items-center p-4 border rounded border-black">
          <QRCode value={window.location.href} />
          <h2 className="type-2 mt-2">Join Code: {joinCode}</h2>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <h2 className="type-2 mb-2">
          Responses ({Object.keys(responses).length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(responses).map(([id, response]) => (
            <div
              key={id}
              className="relative text-center items-center py-3 border rounded border-black"
            >
              {/* delete button */}
              <button
                className="type-2 absolute right-0 top-0 -translate-y-3 translate-x-2"
                aria-label={"delete response"}
                onClick={handleDelete(id)}
              >
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="bg-white rounded-full"
                />
              </button>
              <h3 className="type-1">{response.name}</h3>
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-4">
          <h2 className="type-2 mb-2">Actions</h2>
          <div className="flex flex-row">
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 mr-2 rounded"
              onClick={handleEndQuiz}
            >
              <FontAwesomeIcon
                icon={faStopwatch}
                className="mr-2"
                aria-hidden="true"
              />
              End Quiz
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={handleDeleteQuiz}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="mr-2"
                aria-hidden="true"
              />
              Delete Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherView;
