import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { faHammer, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../../../Generic/Loader";

import {
  generateBlankQuestion,
  generateBlankQuiz,
  QuizTemplate,
  QuestionTemplate,
} from "../DatamaxTypes";
import { generateUUID } from "../../../Generic/UUID";
import { UserContext } from "../../../Auth";
import Question from "./Question";
import createQuiz from "./CreateQuiz";
import { MySwal } from "../../../Generic/Notify";
import AuthWall from "../../../Generic/AuthWall/AuthWall";

const NewQuiz = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();

  // store all of the data for the quiz in a single variable (quiz)
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizTemplate>(generateBlankQuiz());

  // subscribe to the quizSubj$ to handle events
  useEffect(() => {
    if (!quiz.upload) return;
    createQuiz(quiz)
      .then((joinCode) => navigate(`/dash/datamax/quiz/${joinCode}`))
      .catch((err) => {
        setLoading(false);
        console.log(err);
        MySwal.fire({
          icon: "error",
          title: "Error creating quiz",
          text: err.message,
        });
      });
  }, [navigate, quiz]);

  // functions to handle adding/removing questions
  const deleteQuestion = (questionKey: string) => () => {
    setQuiz((quiz) => {
      let newQuestions = { ...quiz.questions };
      delete newQuestions[questionKey];

      return { ...quiz, questions: newQuestions };
    });
  };

  const addQuestion = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setQuiz((quiz) => {
      const newQuestions = { ...quiz.questions };
      newQuestions[generateUUID()] = generateBlankQuestion();
      return { ...quiz, questions: newQuestions };
    });
  };

  const duplicateQuestion = (questionKey: string) => () => {
    setQuiz((quiz) => {
      const newQuestions = { ...quiz.questions };
      const newQuestion = JSON.parse(
        JSON.stringify(quiz.questions[questionKey])
      );
      newQuestions[generateUUID()] = newQuestion;

      return { ...quiz, questions: newQuestions };
    });
  };

  // the updateQuestion is passed to the child Question component
  const updateQuestion = (questionKey: string) => (data: QuestionTemplate) => {
    setQuiz((quiz) => {
      const newQuestions = { ...quiz.questions };
      newQuestions[questionKey] = data;
      return { ...quiz, questions: newQuestions };
    });
  };

  // submit funciton
  const handleNewQuiz = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    setQuiz((quiz) => ({ ...quiz, upload: true }));
  };

  if (!userLoading && !user) return <AuthWall />;
  return (
    <div className="p-4 flex flex-1 flex-col">
      {(!user || loading) && <Loader />}
      <div className="w-4/5 lg:w-2/3 p-2 rounded bg-black-20 mb-4">
        <button
          className="text-digital-blue-dark hover:underline"
          onClick={() => navigate("/dash/datamax")}
        >
          Datamax
        </button>{" "}
        /{" "}
        <button
          className="text-digital-blue-dark hover:underline"
          onClick={() => {}}
        >
          New Quiz
        </button>
      </div>
      <h1 className="text-2xl mb-4">Create a new quiz</h1>

      <form onSubmit={handleNewQuiz}>
        <div className="flex flex-col mb-3">
          <label htmlFor="name" className="mb-2">
            Give your quiz a name
          </label>
          <input
            type="text"
            className="w-4/5 lg:w-1/2 rounded border type-1 px-2 py-1"
            placeholder="My awesome quiz"
            value={quiz.name}
            onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
          ></input>
        </div>

        {Object.keys(quiz.questions).map((questionKey) => (
          <Question
            key={questionKey}
            data={quiz.questions[questionKey]}
            onDelete={deleteQuestion(questionKey)}
            onUpdate={updateQuestion(questionKey)}
            onDuplicate={duplicateQuestion(questionKey)}
          />
        ))}

        <button
          className="flex flex-row w-4/5 lg:w-1/2 rounded border border-black border-dashed p-2 justify-center items-center type-2 hover:bg-black-10"
          onClick={addQuestion}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-10" />
          <span>Add Question</span>
        </button>

        <button className="w-1/3 btn-indigo mt-2" type="submit">
          <FontAwesomeIcon icon={faHammer} className="mr-10" />
          <span>Create Quiz</span>
        </button>
      </form>
    </div>
  );
};

export default NewQuiz;
