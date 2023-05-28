import { getFunctions, httpsCallable } from "firebase/functions";
import { useState, useEffect } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import Loader, { LoaderInline } from "../../../../Generic/Loader/Loader";
import { MySwal } from "../../../../Generic/Notify";
import { useNavigate } from "react-router-dom";

async function textCompletionApiCall(prompt) {
  const functions = getFunctions();
  const callOpenAi = httpsCallable(functions, "generateAiResponse");
  return await callOpenAi(prompt);
}

async function moderationApiCall(prompt) {
  const functions = getFunctions();
  const callOpenAi = httpsCallable(functions, "moderatePrompt");
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

  useEffect(() => {
    async function getRole() {
      const db = getFirestore();
      const docRef = doc(db, "users", props.identifier);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data !== undefined) {
        setUserRole(data.role);
      }
    }
    getRole();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function generateFromAi() {
    try {
      setLoader(true);
      let prompt = "";
      if (promptScaffoldMode) {
        prompt = roleText + " " + contextText + " " + taskText;
      } else {
        prompt = openPromptText;
      }

      //Prompt Moderation
      async function callOpenAiModeration() {
        let res = await moderationApiCall(prompt);
        return res;
      }
      callOpenAiModeration()
        .then((res) => {
          if (res.data.response.flagged === true) {
            setLoader(false);
            MySwal.fire({
              title: "Inappropriate Prompt",
              text: "The prompt entered is not aligned with CRAFT's Content Standards. Please revise your prompt and try again.",
              icon: "warning",
              footer:
                "The prompt language cannot be sexual, violent, or promote hate.",
            });
          } else if (res.data.response.flagged === false) {
            async function callOpenAiTextCompletion() {
              let res = await textCompletionApiCall(
                "Response should be suitable for young students. Strongly refrain from using any profanity, hate, or sexual references. Following is the prompt: \n" +
                  prompt
              );
              return res;
            }

            callOpenAiTextCompletion().then((res) => {
              let obj;

              let responsesData = res.data.response;
              if (promptScaffoldMode) {
                obj = {
                  scaffold: true,
                  role: roleText,
                  context: contextText,
                  task: taskText,
                  iterations: responsesData,
                };
              } else {
                obj = {
                  scaffold: false,
                  promptText: openPromptText,
                  iterations: responsesData,
                };
              }

              setLoader(false);
              let currentData;
              promptyInstanceData?.generations === undefined
                ? (currentData = [])
                : (currentData = promptyInstanceData?.generations);
              saveAiResponseToFirestore([obj, ...currentData]);
            });
          }
        })
        .catch((e) => throwError(e));
    } catch (e) {
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

  const ScaffoldButton = () => {
    return (
      <>
        <div className="mt-4 text-right">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={promptScaffoldMode}
              onChange={() => {
                setPromptScaffoldMode(!promptScaffoldMode);
              }}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-slate-400 dark:peer-focus:ring-slate-400 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-base text-gray-900">
              Enable Prompt Scaffolds
            </span>
          </label>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="h-screen flex">
        <div className="bg-slate-100 p-8 w-1/2">
          <h1 className="text-4xl font-bold mb-10">Prompty</h1>
          <p className="text-xl">{props.instruction}</p>
          <ScaffoldButton />
          {promptScaffoldMode ? (
            // Scaffold mode
            <div>
              <Label for="role" title="Role" color="blue" />
              <textarea
                id="role"
                value={roleText}
                rows="2"
                className="block p-2.5 w-full rounded border-solid border-2 border-gray-300"
                placeholder="Enter text here..."
                onChange={(e) => {
                  setRoleText(e.target.value);
                }}
              ></textarea>
              <Label for="context" title="Context" color="green" />
              <textarea
                id="context"
                value={contextText}
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
                value={taskText}
                rows="2"
                className="block p-2.5 w-full rounded border-solid border-2 border-gray-300"
                placeholder="Enter text here..."
                onInput={(e) => {
                  setTaskText(e.target.value);
                }}
              ></textarea>
            </div>
          ) : (
            // Open Prompt
            <div>
              <Label for="openPrompt" title="Prompt" color="gray" />
              <textarea
                id="openPrompt"
                value={openPromptText}
                rows="6"
                className="block p-2.5 w-full rounded border-solid border-2 border-gray-300"
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
                <button
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-400  text-white font-bold py-2 px-4 rounded"
                  disabled={allowGenerate ? true : false}
                  onClick={() => {
                    generateFromAi();
                  }}
                >
                  Generate From AI
                </button>
              ) : (
                <p>No more tries available!</p>
              )}
              {loader && <LoaderInline />}
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
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 bg-slate-200 p-8 overflow-y-scroll">
            {loader && (
              <div className="text-center">
                <LoaderInline />
              </div>
            )}
            {responsesData.length === 0 ? (
              <>
                <p className="text-5xl text-slate-400 p-4 font-thin text-center mt-[100px]">
                  Enter your prompt and generate responses from AI.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-bold text-4xl mb-4 text-slate-400">
                  Generated From AI
                </h2>
                <GeneratedResponses responses={responsesData} />
              </>
            )}
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

const GeneratedResponses = (props) => {
  const IndividualTry = (props) => {
    const [selectedResponse, setSelectedResponse] = useState(0);
    return (
      <>
        <div className="mb-4 border-b border-gray-200">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="iterationOptions"
            role="tablist"
          >
            {props.iterations.map((data, i) => {
              return (
                <li key={i} className="mr-2" role="presentation">
                  <button
                    data-option={i}
                    className={`inline-block p-4 border-b-4 ${
                      selectedResponse === i
                        ? "border-gray-600"
                        : "border-transparent text-gray-500"
                    } rounded-t-lg`}
                    id={"option-tab-" + i}
                    type="button"
                    role="tab"
                    aria-controls={"option-" + i}
                    aria-selected="false"
                    onClick={(e) => {
                      let optionNum = parseInt(
                        e.target.getAttribute("data-option")
                      );
                      setSelectedResponse(optionNum);
                    }}
                  >
                    Option {i + 1}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <>
          <p className="text-md whitespace-pre-wrap">
            {props.iterations[selectedResponse].text.slice(1)}
          </p>
        </>
      </>
    );
  };

  return (
    <>
      {props.responses.map((data, i) => {
        return (
          <div key={i} className="shadow-lg p-4 rounded bg-white mb-4">
            <h4 className="text-sm font-bold text-slate-400 tracking-[0.3em] mb-2">
              TRY {props.responses.length - i}
            </h4>
            {data.scaffold ? (
              // Scaffolded Prompt
              <div className="text-lg">
                <p className="text-sm font-semibold text-gray-600 my-3">
                  <span className="mr-4">
                    <span className="text-blue-300">∎</span> Role
                  </span>
                  <span className="mr-4">
                    <span className="text-green-300">∎</span> Context
                  </span>
                  <span className="mr-4">
                    <span className="text-orange-300">∎</span> Task
                  </span>
                </p>
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
              </div>
            ) : (
              <div className="text-lg font-normal">
                <p>{data.promptText}</p>
              </div>
            )}

            <hr className="mt-4" />
            <IndividualTry iterations={data.iterations} />
          </div>
        );
      })}
    </>
  );
};
