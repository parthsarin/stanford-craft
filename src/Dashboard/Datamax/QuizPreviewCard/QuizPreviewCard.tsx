import { useNavigate } from "react-router-dom";
import { QuizPreviewCardProps } from "../DatamaxTypes";

const QuizPreviewCard = ({ quiz, joinCode, createdAt }: QuizPreviewCardProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (quiz.active)
      navigate(`/dash/datamax/quiz/${joinCode}`);
    else
      navigate(`/dash/analyze/${joinCode}`);
  }

  const { template } = quiz;

  return (
    <button 
      className="border rounded border-black px-3 py-1 hover:bg-gray-100"
      onClick={onClick}
    >
      <h2 className="text-lg">{template.name}</h2>
      <p className="text-sm italic mb-2">Join Code: {joinCode}</p>
      <p className="text-sm">Created on {createdAt.toDate().toLocaleDateString("en-US")}</p>
    </button>
  )
}

export default QuizPreviewCard;