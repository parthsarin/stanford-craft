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
  const [loader, setLoader] = useState(false);
  const [promptyInstanceData, setPromptyInstanceData] = useState();
  const [responseData, setResponseData] = useState([]);

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
    instanceData !== undefined && instanceDataFunctions();
    function instanceDataFunctions() {
      setPromptyInstanceData(instanceData.data());
    }
  }, [instanceData]);

  useEffect(() => {
    promptyInstanceData?.generations !== undefined &&
      setResponseData(promptyInstanceData.generations);
  }, [promptyInstanceData]);

  function generateFromAi() {
    setLoader(true);
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
      setLoader(false);
      let currentData;
      promptyInstanceData?.generations === undefined
        ? (currentData = [])
        : (currentData = promptyInstanceData?.generations);
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
      <div className="h-screen flex">
        <div className="bg-slate-100 p-8 w-1/2">
          <h1 className="text-4xl font-bold mb-10">Prompty</h1>
          <p className="text-xl">{props.instruction}</p>
          <Label for="role" title="Role" color="blue" />
          <textarea
            id="role"
            rows="2"
            className="block p-2.5 w-full rounded border-solid border-2 border-gray-300"
            placeholder="Enter text here..."
            onInput={(e) => {
              setRoleText(e.target.value);
            }}
          ></textarea>
          <Label for="context" title="Context" color="green" />
          <textarea
            id="context"
            rows="2"
            className="block p-2.5 w-full rounded border-solid border-2 border-gray-300"
            placeholder="Enter text here..."
            onInput={(e) => {
              setContextText(e.target.value);
            }}
          ></textarea>
          <Label for="task" title="Task" color="brown" />
          <textarea
            id="task"
            rows="2"
            className="block p-2.5 w-full rounded border-solid border-2 border-gray-300"
            placeholder="Enter text here..."
            onInput={(e) => {
              setTaskText(e.target.value);
            }}
          ></textarea>
          <div className="mt-5 grid grid-cols-2">
            <div>
              {/* Check for tries */}
              {props.limit - responseData.length > 0 ? (
                <button
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-400  text-white font-bold py-2 px-4 rounded"
                  disabled={
                    roleText !== "" &&
                    contextText !== "" &&
                    taskText !== "" &&
                    loader !== true
                      ? false
                      : true
                  }
                  onClick={() => {
                    generateFromAi();
                  }}
                >
                  Generate From AI
                </button>
              ) : (
                <p>No more tries available!</p>
              )}
            </div>
            <div>
              <div className="float-right">
                {" "}
                <TryCounter
                  availableTry={props.limit - responseData.length}
                  usedTry={responseData.length}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 bg-slate-200 p-8 overflow-y-scroll">
            {loader && <p>Loading. Please wait...</p>}

            <GeneratedResponses responses={responseData} />
          </div>
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
        className="block mt-4 ml-2 text-sm font-medium text-gray-900"
      >
        <span
          className="rounded-t"
          style={{
            backgroundColor: props.color,
            width: "70px",
            display: "block",
            textAlign: "center",
            color: "white",
          }}
        >
          {props.title}
        </span>
      </label>
    </>
  );
};

const TryCounter = (props) => {
  return (
    <>
      <span className="text-xl">Tries Available: </span>
      {[...Array(props.usedTry)].map((e, i) => (
        <span className="text-gray-400 text-2xl" key={i}>
          ★
        </span>
      ))}
      {[...Array(props.availableTry)].map((e, i) => (
        <span className="text-orange-400 text-2xl" key={i}>
          ★
        </span>
      ))}
    </>
  );
};

const GeneratedResponses = (props) => {
  return (
    <>
      {props.responses.map((data, i) => {
        return (
          <div key={i} className="shadow-lg p-4 rounded bg-white mb-4">
            <h4 className="text-xl mb-2">Try {props.responses.length - i}</h4>
            <p>
              <span className="bg-blue-100 px-2 box-decoration-clone">
                {data.role}
              </span>
            </p>
            <p>
              <span className="bg-green-100 px-2 box-decoration-clone">
                {data.context}
              </span>
            </p>
            <p>
              <span className="bg-orange-100 px-2 box-decoration-clone">
                {data.task}
              </span>
            </p>
            <hr className="mt-4" />
            <p className="text-md whitespace-pre-wrap">{data.response}</p>
          </div>
        );
      })}
    </>
  );
};
