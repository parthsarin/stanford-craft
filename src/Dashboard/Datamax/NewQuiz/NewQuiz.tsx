import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { generateUUID } from "./GenerateDefaults";
import QuestionTemplate from "./QuestionTemplate";

const NewQuiz = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<string[]>([]);

  return (
    <div className="p-4 flex flex-1 flex-col">
      <div className="w-4/5 md:w-2/3 p-2 rounded bg-gray-200 mb-4">
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

      <form onSubmit={handleSubmit((data) => {})}>
        <div className="flex flex-col mb-3">
          <label htmlFor="name" className="mb-2">
            Give your quiz a name
          </label>
          <input
            type="text"
            className={`w-4/5 md:w-1/2 rounded border px-2 py-1 ${
              errors.name ? "border-red-700" : "border-black"
            }`}
            placeholder="My awesome quiz"
            {...register("name", { required: true })}
          ></input>
        </div>

        {
          questions.map((questionKey) => (
            <QuestionTemplate 
              questionKey={questionKey} 
              register={register} 
              errors={errors} 
            />
          ))
        }

        <button 
          className="flex flex-row w-4/5 md:w-1/2 rounded border border-black border-dashed p-2 justify-center items-center text-xl hover:bg-gray-100"
          onClick={() => setQuestions([...questions, generateUUID()])}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span>Add Question</span>
        </button>
      </form>
    </div>
  );
}

export default NewQuiz;