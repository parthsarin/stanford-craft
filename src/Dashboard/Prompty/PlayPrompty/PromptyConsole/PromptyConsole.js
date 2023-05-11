import { getFunctions, httpsCallable } from "firebase/functions";
import { useState, useEffect } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import Loader from "../../../../Generic/Loader/Loader";
import { MySwal } from "../../../../Generic/Notify";
import { useNavigate } from "react-router-dom";

async function apiCall(prompt) {
  const functions = getFunctions();
  const callOpenAi = httpsCallable(functions, "generateAiResponse");
  return await callOpenAi(prompt);
}

const PromptyConsole = (props) => {
  const [roleText, setRoleText] = useState("");
  const [contextText, setContextText] = useState("");
  const [taskText, setTaskText] = useState("");
  const [loaderText, setLoaderText] = useState("");
  const [promptyInstanceData, setPromptyInstanceData] = useState();
  const navigate = useNavigate();
  const [instanceData, loading, error] = useDocument(
    doc(
      getFirestore(),
      "prompty",
      props.instanceCode,
      "instances",
      props.identifier
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    instanceData !== undefined && setPromptyInstanceData(instanceData.data());
  }, [instanceData]);

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
      let currentData;
      promptyInstanceData?.generations === undefined
        ? (currentData = [])
        : (currentData = promptyInstanceData?.generations);
      console.log(promptyInstanceData?.generations);
      console.log(currentData);
      saveAiResponseToFirestore([obj, ...currentData]);
    });
  }

  function saveAiResponseToFirestore(data) {
    const db = getFirestore();
    let docRef = doc(
      db,
      "prompty",
      props.instanceCode,
      "instances",
      props.identifier
    );
    setDoc(docRef, { generations: data }, { merge: true });
  }

  if (error) {
    MySwal.fire({
      title: "Error",
      text: error,
      icon: "error",
    }).then(() => navigate("/dash/prompty"));
    return null;
  }

  if (loading) return <Loader />;

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p>{props.instruction}</p>
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
          <GeneratedResponses responses={promptyInstanceData?.generations} />
        </div>
      </div>
    </>
  );
};

export default PromptyConsole;

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
  const [responseData, setResponseData] = useState([]);
  useEffect(() => {
    props.responses !== undefined && setResponseData(props.responses);
  }, [props]);
  return (
    <>
      {responseData.map((data, i) => {
        return (
          <div key={i}>
            <h4>Try {responseData.length - i}</h4>
            <p>{data.role}</p>
            <p className="text-md whitespace-pre-wrap">{data.response}</p>
          </div>
        );
      })}
    </>
  );
};
