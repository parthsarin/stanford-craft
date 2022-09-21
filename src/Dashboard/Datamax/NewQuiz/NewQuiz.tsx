import { faHammer, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createNewQuiz } from "./CreateNewQuiz";
import { generateUUID } from "./GenerateDefaults";
import QuestionTemplate from "./QuestionTemplate";

const NewQuiz = () => {
  const { register, unregister, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<{[x: string]: null}>({});

  const handleDestroy = (questionKey: string) => () => {
    let newQuestions = {...questions};
    delete newQuestions[questionKey]

    setQuestions(newQuestions);
  }

  return (
    <div className="p-4 flex flex-1 flex-col">
      <div className="w-4/5 lg:w-2/3 p-2 rounded bg-gray-200 mb-4">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => navigate("/dashboard/datamax")}
        >
          Datamax
        </button>{" "}
        /{" "}
        <button className="text-blue-600 hover:underline" onClick={() => {}}>
          New Quiz
        </button>
      </div>
      <h1 className="text-2xl mb-4">Create a new quiz</h1>

      <form onSubmit={handleSubmit((data) => createNewQuiz(data, Object.keys(questions)))}>
        <div className="flex flex-col mb-3">
          <label htmlFor="name" className="mb-2">
            Give your quiz a name
          </label>
          <input
            type="text"
            className={`w-4/5 lg:w-1/2 rounded border text-lg px-2 py-1 ${
              errors.name ? "border-red-700" : "border-black"
            }`}
            placeholder="My awesome quiz"
            {...register("name", { required: true })}
          ></input>
        </div>

        {Object.keys(questions).map((questionKey) => (
          <QuestionTemplate
            key={`${questionKey}`}
            destroy={handleDestroy(questionKey)}
            {...{ questionKey, register, errors, unregister }}
          />
        ))}

        <button
          className="flex flex-row w-4/5 lg:w-1/2 rounded border border-black border-dashed p-2 justify-center items-center text-xl hover:bg-gray-100"
          onClick={() => setQuestions({ ...questions, [generateUUID()]: null })}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span>Add Question</span>
        </button>

        <button className="w-1/3 btn-indigo mt-2" type="submit">
          <FontAwesomeIcon icon={faHammer} className="mr-2" />
          <span>Generate Quiz</span>
        </button>
      </form>
    </div>
  );
}

export default NewQuiz;