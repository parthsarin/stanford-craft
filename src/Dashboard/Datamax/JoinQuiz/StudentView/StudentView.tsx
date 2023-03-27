import { FormEvent, useContext, useEffect, useState } from "react";
import Loader from "../../../../Generic/Loader";
import { Quiz } from "../../DatamaxTypes";
import { getFunctions, httpsCallable } from "firebase/functions";
import { UserContext } from "../../../../Auth";
import Question from "./Question";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { generateUUID } from "../../../../Generic/UUID";
import { MySwal } from "../../../../Generic/Notify";

interface Params {
  joinCode: string;
}

interface QuizResponse {
  name: string;
  responses: { [k: string]: string };
}

interface ResponsePayload {
  [k: string]: {
    dataElementValues: {
      [k: string]: number;
    }
    response: string;
  }
}

const StudentView = ({ joinCode }: Params) => {
  const { user } = useContext(UserContext);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [responses, setResponses] = useState<QuizResponse['responses']>({});
  const [submitted, setSubmitted] = useState(false);

  // generate a copy of the quiz
  useEffect(() => {
    if (quiz) return;

    (async () => {
      const functions = getFunctions();
      const generateQuiz = httpsCallable(functions, "generateQuiz");
      const result = await generateQuiz({ joinCode });
      const data: any = result.data;

      const quiz = data.quiz as Quiz;
      setQuiz(quiz as Quiz);

      // set the responses object
      let responses: QuizResponse['responses'] = {};
      quiz.questions.forEach((q) => responses[q.id] = "");
      setResponses(responses);
    })();
  }, [quiz, joinCode, setQuiz]);

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
    quiz?.questions.forEach((q) => {
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
    const docId = user?.uid || generateUUID();
    const docRef = doc(db, "datamax-active", joinCode, "responses", docId);

    // write the response to the database
    setDoc(docRef, { response: responsePayload, name: responses.name })
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
        text: "You can't submit the quiz twice",
        footer: `${err}`
      }));
  };

  if (!quiz) return <Loader />;
  if (submitted) return (
    <div className="p-4 w-full lg:w-2/3">
      <h1 className="text-2xl mb-2">🎉 Submitted "{quiz.name}"!</h1>
    </div> 
  )
  return (
    <div className="p-4 w-full lg:w-2/3">
      <h1 className="text-2xl mb-2">{quiz.name}</h1>
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
              value={responses.name}
              className="w-full p-2 rounded rounded-md bg-slate-500 text-white"
              onChange={(e) => setResponses({ ...responses, name: e.target.value })}
              disabled={user ? true : false}
            />
          </div>
          {
            quiz.questions.map((question) => (
              <div key={question.id} className="col-span-3 mb-6 bg-slate-100 text-black p-3 rounded rounded-md">
                <Question question={question} onChange={(r) => setResponses({ ...responses, [question.id]: r })} />
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