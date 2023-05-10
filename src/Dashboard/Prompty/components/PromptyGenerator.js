import { getFunctions, httpsCallable } from "firebase/functions";
import { useState } from "react";

async function apiCall(prompt) {
  const functions = getFunctions();
  const callOpenAi = httpsCallable(functions, "generateAiResponse");
  return await callOpenAi(prompt);
}

const PromptyGenerator = () => {
  const [aiResponses, setAiResponses] = useState([]);
  const [roleText, setRoleText] = useState("");
  const [contextText, setContextText] = useState("");
  const [taskText, setTaskText] = useState("");
  const [loaderText, setLoaderText] = useState("");

  function generateFromAi() {
    setLoaderText("Loading... Please wait...");
    let prompt = roleText + " " + contextText + " " + taskText;
    async function callOpenAi() {
      let res = await apiCall(prompt);
      return res;
    }
    callOpenAi().then((res) => {
      let obj = {
        role: roleText,
        context: contextText,
        task: taskText,
        response: res.data.response,
      };
      setLoaderText("");
      setAiResponses([obj, ...aiResponses]);
    });
  }
  return (
    <>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-10">Prompty</h1>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <Label for="role" title="Role" />
            <textarea
              id="role"
              rows="2"
              className="block p-2.5 w-full rounded border-solid border-2 border-gray-300"
              placeholder="Write your thoughts here..."
              onInput={(e) => {
                setRoleText(e.target.value);
              }}
            ></textarea>
            <Label for="context" title="Context" />
            <textarea
              id="context"
              rows="2"
              className="block p-2.5 w-full rounded border-solid border-2 border-gray-300"
              placeholder="Write your thoughts here..."
              onInput={(e) => {
                setContextText(e.target.value);
              }}
            ></textarea>
            <Label for="task" title="Task" />
            <textarea
              id="task"
              rows="2"
              className="block p-2.5 w-full rounded border-solid border-2 border-gray-300"
              placeholder="Write your thoughts here..."
              onInput={(e) => {
                setTaskText(e.target.value);
              }}
            ></textarea>
            <button
              className="mt-5 bg-red-600 hover:bg-red-700 disabled:bg-red-400  text-white font-bold py-2 px-4 rounded"
              disabled={
                roleText !== "" && contextText !== "" && taskText !== ""
                  ? false
                  : true
              }
              onClick={() => {
                generateFromAi();
              }}
            >
              Generate From AI
            </button>
          </div>
          <div>
            <p>{loaderText}</p>
            <GeneratedResponses responses={aiResponses} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptyGenerator;

const Label = (props) => {
  return (
    <>
      <label
        htmlFor={props.for}
        className="block mt-4 mb-2 text-sm font-medium text-gray-900"
      >
        {props.title}
      </label>
    </>
  );
};

const GeneratedResponses = (props) => {
  return (
    <>
      {props.responses.map((data, i) => {
        return (
          <div key={i}>
            <h4>Try {props.responses.length - i}</h4>
            <p>{data.role}</p>
            <p className="text-md whitespace-pre-wrap">{data.response}</p>
          </div>
        );
      })}
    </>
  );
};
