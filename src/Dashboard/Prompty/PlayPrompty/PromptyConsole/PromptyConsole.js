import { getFunctions, httpsCallable } from "firebase/functions";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import Loader, { LoaderInline } from "../../../../Generic/Loader/Loader";
import { MySwal } from "../../../../Generic/Notify";
import { useNavigate } from "react-router-dom";
import { Switch } from "../../../../Generic/Switch/Switch";
import GeneratedResponses from "./components/GeneratedResponses";

async function moderationAndCompletionApiCall(prompt) {
  const functions = getFunctions();
  const callOpenAi = httpsCallable(
    functions,
    "moderatePromptAndCreateCompletion"
  );
  return await callOpenAi(prompt);
}

const PromptyConsole = (props) => {
  const [roleText, setRoleText] = useState("");
  const [contextText, setContextText] = useState("");
  const [taskText, setTaskText] = useState("");
  const [openPromptText, setOpenPromptText] = useState("");
  const [loader, setLoader] = useState(false);
  const [promptScaffoldMode, setPromptScaffoldMode] = useState(true);
  const [promptyInstanceData, setPromptyInstanceData] = useState();
  const [responsesData, setResponsesData] = useState([]);
  const [allowGenerate, setAllowGenerate] = useState(false);
  const [userRole, setUserRole] = useState();

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
    (async () => {
      const db = getFirestore();
      const docRef = doc(db, "users", props.identifier);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data !== undefined) {
        setUserRole(data.role);
      }
    })();
  }, [props.identifier]);

  useEffect(() => {
    instanceData !== undefined && instanceDataFunctions();
    function instanceDataFunctions() {
      setPromptyInstanceData(instanceData.data());
    }
  }, [instanceData]);

  useEffect(() => {
    promptyInstanceData?.generations !== undefined &&
      setResponsesData(promptyInstanceData.generations);
  }, [promptyInstanceData]);

  useEffect(() => {
    if (promptScaffoldMode) {
      if (
        roleText !== "" &&
        contextText !== "" &&
        taskText !== "" &&
        loader !== true
      ) {
        setAllowGenerate(false);
      } else {
        setAllowGenerate(true);
      }
    } else {
      if (openPromptText !== "" && loader !== true) {
        setAllowGenerate(false);
      } else {
        setAllowGenerate(true);
      }
    }
  }, [
    roleText,
    contextText,
    taskText,
    loader,
    openPromptText,
    promptScaffoldMode,
  ]);

  async function generateFromOpenAi(uId, instanceCode) {
    try {
      setLoader(true);
      let prompt = {};
      if (promptScaffoldMode) {
        prompt = {
          roleText: roleText,
          contextText: contextText,
          taskText: taskText,
        };
      } else {
        prompt = { openPromptText: openPromptText };
      }
      let request = {
        prompt: prompt,
        userId: uId,
        instanceId: instanceCode,
        scaffoldMode: promptScaffoldMode,
      };
      let response = await moderationAndCompletionApiCall(request);
      if (response.data.flagged === true) {
        setLoader(false);
        MySwal.fire({
          title: "Inappropriate Prompt",
          text: "The prompt entered is not aligned with CRAFT's Content Standards. Please revise your prompt and try again.",
          icon: "warning",
          footer:
            "The prompt language cannot be sexual, violent, or promote hate.",
        });
      } else if (response.data.flagged === false) {
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
      throwError(e);
    }
  }

  function throwError(e) {
    MySwal.fire({
      title: "Error",
      text: e,
      icon: "error",
    });
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

  const ScaffoldButton = () => {
    function handleChange(checked) {
      setPromptScaffoldMode(checked);
    }
    return (
      <>
        <Switch
          checked={promptScaffoldMode}
          onChange={handleChange}
          label="Enable Prompt Guides"
        />
      </>
    );
  };

  return (
    <>
      <div className="h-screen">
        <div className="bg-slate-100 p-20 h-[230px] overflow-y-scroll">
          <p className="text-xl mb-6">{props.instruction}</p>

          {promptScaffoldMode ? (
            // Scaffold mode
            <div className="grid my-15 grid-cols-3">
              <div className="mr-20">
                <Label for="role" title="Role" color="blue" />
                <textarea
                  id="role"
                  value={roleText}
                  rows="2"
                  className="block p-2.5 input w-full rounded border-solid border-2 border-gray-300"
                  placeholder="Enter text here..."
                  onChange={(e) => {
                    setRoleText(e.target.value);
                  }}
                ></textarea>
              </div>
              <div>
                <Label for="context" title="Context" color="green" />
                <textarea
                  id="context"
                  value={contextText}
                  rows="2"
                  className="block p-2.5 input w-full rounded border-solid border-2 border-gray-300"
                  placeholder="Enter text here..."
                  onInput={(e) => {
                    setContextText(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="ml-20">
                <Label for="task" title="Task" color="brown" />
                <textarea
                  id="task"
                  value={taskText}
                  rows="2"
                  className="block p-2.5 input w-full rounded border-solid border-2 border-gray-300"
                  placeholder="Enter text here..."
                  onInput={(e) => {
                    setTaskText(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
          ) : (
            // Open Prompt
            <div className="my-15">
              <Label for="openPrompt" title="Prompt" color="gray" />
              <textarea
                id="openPrompt"
                value={openPromptText}
                rows="2"
                className="block p-2.5 input w-full rounded border-solid border-2 border-gray-300"
                placeholder="Enter text here..."
                onInput={(e) => {
                  setOpenPromptText(e.target.value);
                }}
              ></textarea>
            </div>
          )}
          <div className="mt-5 grid grid-cols-2">
            <div>
              {/* Check for tries */}
              {props.limit - responsesData.length > 0 ||
              userRole === "teacher" ? (
                <>
                  <button
                    className="btn-digital-red"
                    disabled={allowGenerate ? true : false}
                    onClick={() => {
                      generateFromOpenAi(props.identifier, props.instanceCode);
                    }}
                  >
                    Generate From AI
                  </button>
                  <div className="inline ml-10">
                    <ScaffoldButton />
                  </div>
                </>
              ) : (
                <p>No more tries available!</p>
              )}
            </div>
            <div>
              <div className="float-right">
                {userRole === "teacher" ? (
                  <div>⭐Unlimited tries available for you!</div>
                ) : (
                  <TryCounter
                    availableTry={props.limit - responsesData.length}
                    usedTry={responsesData.length}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-20 h-[calc(100%-230px)] bg-foggy-light overflow-hidden">
          {loader && (
            <div className="text-center">
              <LoaderInline />
            </div>
          )}
          {responsesData.length === 0 ? (
            <>
              <p className="text-[2em] font-thin text-center mt-[100px]">
                Enter your prompt and generate responses from AI.
              </p>
            </>
          ) : (
            <>
              <GeneratedResponses responses={responsesData} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PromptyConsole;

const Label = (props) => {
  return (
    <>
      <label htmlFor={props.for} className="block ml-6">
        <span
          className="rounded-t mt-0"
          style={{
            backgroundColor: props.color,
            height: "20px",
            width: "70px",
            display: "block",
            textAlign: "center",
            color: "white",
          }}
        >
          <small
            style={{ fontSize: "16px", position: "relative", bottom: "4px" }}
          >
            {props.title}
          </small>
        </span>
      </label>
    </>
  );
};

const TryCounter = (props) => {
  if (props.usedTry >= 0 && props.availableTry >= 0) {
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
  }
};
