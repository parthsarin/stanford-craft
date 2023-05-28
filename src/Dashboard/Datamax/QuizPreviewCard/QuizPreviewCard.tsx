import { useNavigate } from "react-router-dom";
import { QuizPreviewCardProps } from "../DatamaxTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { MySwal } from "../../../Generic/Notify";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const QuizPreviewCard = ({
  quiz,
  joinCode,
  createdAt,
}: QuizPreviewCardProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (quiz.active) navigate(`/dash/datamax/quiz/${joinCode}`);
    else navigate(`/dash/analyze/${joinCode}`);
  };

  const handleDelete = () => {
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

        window.location.reload();
      }
    });
  };

  const { template } = quiz;

  return (
    <div
      className="border rounded border-black px-10 py-5 hover:bg-black-10 hover:cursor-pointer relative text-center z-0"
      onClick={onClick}
      role="button"
    >
      <button
        className="type-2 absolute right-0 top-0 -translate-y-15 translate-x-15 z-10"
        aria-label={"delete game"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDelete();
        }}
      >
        <FontAwesomeIcon
          icon={faXmarkCircle}
          className="bg-white rounded-full"
        />
      </button>
      <h2 className="type-1">{template.name}</h2>
      <p className="type-0 italic mb-2">Join Code: {joinCode}</p>
      <p className="type-0 mb-0">
        Created on {createdAt.toDate().toLocaleDateString("en-US")}
      </p>
    </div>
  );
};

export default QuizPreviewCard;
