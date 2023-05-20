import { FormEvent, useContext, useEffect, useState } from "react";
import Loader from "../../../../Generic/Loader";
import { Quiz, QuizDoc, ResponsePayload } from "../../DatamaxTypes";
import { UserContext } from "../../../../Auth";
import Question from "./Question";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { MySwal } from "../../../../Generic/Notify";
import generateFromTemplate from "./GenerateQuiz";

interface Params {
  joinCode: string;
  quiz: QuizDoc;
}

interface QuizResponse {
  name: string;
  responses: { [k: string]: string };
}

const StudentView = ({ joinCode, quiz }: Params) => {
  const { user } = useContext(UserContext);
  const [filledTemplate, setFilledTemplate] = useState<Quiz | null>(null);
  const [responses, setResponses] = useState<QuizResponse['responses']>({});
  const [submitted, setSubmitted] = useState(false);

  // generate a copy of the quiz
  useEffect(() => {
    if (filledTemplate) return;
    setFilledTemplate(generateFromTemplate(quiz.template));
  }, [filledTemplate, quiz.template]);

  // add the user's name to the responses object
  useEffect(() => {
    if (!user || !user.displayName || responses.name) return;
    setResponses({ ...responses, name: user.displayName });
  }, [user, responses, setResponses]);

  // the function to handle quiz submission
  const submitQuiz = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // assemble the response object and validate
    let responsePayload: ResponsePayload = {};
    let invalidQuestions: string[] = [];
    let valid = true;
    filledTemplate?.questions.forEach((q) => {
      // is there a response?
      if (!responses[q.id]) {
        invalidQuestions.push(`"${q.prompt}"`);
        valid = false;
      }

      // store the values of the data elements
      let dataElementValues: { [k: string]: number } = {};
      q.dataElements.forEach((de) => {
        dataElementValues[de.id] = de.value;
      });

      responsePayload[q.id] = {
        dataElementValues,
        response: responses[q.id]
      };
    });

    if (!valid) {
      MySwal.fire({
        title: "Please answer all questions",
        icon: "error",
        text: `Questions not answered: ${invalidQuestions.join(", ")}`
      });
      return;
    }

    // write the response to the database
    const db = getFirestore();
    const colRef = collection(db, "datamax", joinCode, "responses");

    // write the response to the database
    addDoc(colRef, { response: responsePayload, name: responses.name })
      .then(() => window.scrollTo(0, 0))
      .then(() => {
        MySwal.fire({
          title: "Quiz submitted",
          icon: "success",
          text: "Your quiz has been submitted"
        });
        setSubmitted(true);
      })
      .catch((err) => MySwal.fire({
        title: "Error submitting quiz",
        icon: "error",
        text: "There was an error submitting your quiz.",
        footer: `${err}`
      }));
  };

  if (!quiz) return <Loader />;
  if (submitted) return (
    <div className="p-4 w-full lg:w-2/3">
      <h1 className="text-2xl mb-2">🎉 Submitted "{quiz.template.name}"!</h1>
      <button
        onClick={() => window.location.reload()}
        className="text-lg text-blue-500 hover:text-blue-600 underline"
      >
        Submit another response
      </button>

    </div> 
  )
  return (
    <div className="p-4 w-full lg:w-2/3">
      <h1 className="text-2xl mb-2">{quiz.template.name}</h1>
      <form
        className="flex flex-col bg-slate-600 text-white rounded rounded-md w-full p-4"
        onSubmit={submitQuiz}
      >
        <div className="grid grid-cols-3">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <div className="col-span-3 sm:col-span-2 mb-6">
            <input
              type="text"
              name="displayName"
              value={responses.name ? responses.name : ""}
              className="w-full p-2 rounded rounded-md bg-slate-500 text-white"
              onChange={(e) => setResponses({ ...responses, name: e.target.value })}
              disabled={user ? true : false}
            />
          </div>
          {
            quiz.template.questions.map((question) => (
              <div key={question.id} className="col-span-3 mb-6 bg-slate-100 text-black p-3 rounded rounded-md">
                <Question 
                  question={question} 
                  onChange={(r) => setResponses({ ...responses, [question.id]: r })} 
                />
              </div>
            ))
          }
          <button
            type="submit"
            className={`
            col-span-3 bg-indigo-500 text-white p-2 rounded rounded-md text-lg
            hover:bg-indigo-600
            `}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentView;