import { getFunctions, httpsCallable } from "firebase/functions";
import { useState, useEffect } from "react";
import { getFirestore, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import Loader, { LoaderInline } from "../../../../Generic/Loader/Loader";
import { MySwal } from "../../../../Generic/Notify";
import { useNavigate } from "react-router-dom";
import { Switch } from "../../../../Generic/Switch/Switch";
import GeneratedResponses from "./components/GeneratedResponses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tippy";

async function moderationAndCompletionApiCall(prompt) {
  const functions = getFunctions();
  const callOpenAi = httpsCallable(
    functions,
    "moderatePromptAndCreateCompletion"
  );
  return await callOpenAi(prompt);
}

const allowedTries = 5;

function numberOfGenerationsWithin60Mins(entries) {
  if (entries.length === 0) {
    return { lastLogtime: null, numberOfEntries: 0, minutesDifference: 0 };
  }

  // Initialize variables to track the latest log time, count of entries within 60 minutes, and the time limit in minutes
  let timeLimitInMins = 60;
  let latestLogTime = 0;
  let countWithin60Minutes = 0;

  // Get the current time in milliseconds
  const currentTime = new Date().getTime();

  // Iterate through the log entries
  for (const entry of entries) {
    const logTime = entry.logTime;

    // Calculate the minutes difference by dividing the time difference by the time limit
    const minutesDifference = Math.floor((currentTime - logTime) / 60000);

    // Update the latest log time
    if (logTime > latestLogTime) {
      latestLogTime = logTime;
    }

    // Check if the entry is within 60 minutes and increment the count
    if (minutesDifference <= timeLimitInMins) {
      countWithin60Minutes++;
    }
  }

  // Calculate the number of minutes it would take to cross 60 minutes from the last log time
  const minutesDifference = Math.max(
    0,
    timeLimitInMins - Math.floor((currentTime - latestLogTime) / 60000)
  );

  return {
    lastLogtime: latestLogTime,
    numberOfEntries: countWithin60Minutes + 1, // Add 1 to count the latest log entry
    minutesDifference,
  };
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
  const [countCheck, setCountCheck] = useState({
    lastLogtime: null,
    numberOfEntries: 0,
    minutesDifference: 0,
  });

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
    if (promptyInstanceData?.generations !== undefined) {
      setResponsesData(promptyInstanceData.generations);
      let countCheck = numberOfGenerationsWithin60Mins(
        promptyInstanceData.generations
      );
      console.log(countCheck);
      setCountCheck(countCheck);
    }
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
        <div className="bg-slate-100 p-20 h-[260px] overflow-y-scroll">
          <p className="mb-6">
            Enter your prompt to generate responses from a{" "}
            <Tooltip
              html={
                <div className="text-left">
                  <p>
                    Large Language Model (LLM) is an AI model with billions of
                    parameters used to generate sequences of text or code.
                  </p>
                  <p>
                    Interested in learning more about LLMs? Check out{" "}
                    <a href="/#" target="_blank" rel="noreferrer">
                      this lesson
                    </a>
                    .
                  </p>
                </div>
              }
              theme="light"
              arrow={true}
              interactive={true}
            >
              <span className="underline">
                <span className="text-[16px] relative bottom-0 ml-4">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </span>
                Large Language Model (LLM)
              </span>
            </Tooltip>
            . Use the 'Prompt Guide' below to write an effective prompt.
          </p>

          {promptScaffoldMode ? (
            // Scaffold mode
            <div className="grid my-15 grid-cols-3">
              <div className="mr-20">
                <Label
                  for="role"
                  title="Speaker"
                  color="digital-blue"
                  helperTooltipHTML={
                    <span className="text-left">
                      <p className="mb-4">
                        Who should the AI act like when writing this piece?
                      </p>
                      <p className="mb-2">
                        <i>Example: You are a concerned citizen.</i>
                      </p>
                    </span>
                  }
                />
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
                <Label
                  for="context"
                  title="Purpose"
                  color="palo-alto"
                  helperTooltipHTML={
                    <span className="text-left">
                      <p className="mb-4">
                        What is the purpose of the written piece?
                      </p>
                      <p className="mb-2">
                        <i>
                          Example: You are writing a piece on the importance of
                          voting.
                        </i>
                      </p>
                    </span>
                  }
                />
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
                <Label
                  for="task"
                  title="Audience"
                  color="digital-red"
                  helperTooltipHTML={
                    <span className="text-left">
                      <p className="mb-4">
                        Who is the audience of the written piece?
                      </p>
                      <p className="mb-2">
                        <i>
                          Example: The audience is the United States Congress.
                        </i>
                      </p>
                    </span>
                  }
                />
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
              <Label
                for="openPrompt"
                title="Prompt"
                color="stone"
                helperTooltipHTML={
                  <span className="text-left">
                    <p className="mb-4">
                      Write a prompt that completely conveys what you intend to
                      get from the AI.
                    </p>
                  </span>
                }
              />
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
              {countCheck.numberOfEntries <= allowedTries ? (
                <>
                  <button
                    className={`${
                      allowGenerate ? "bg-black-40" : "bg-digital-red"
                    } text-white px-20 py-10 rounded `}
                    disabled={allowGenerate ? true : false}
                    onClick={() => {
                      generateFromOpenAi(props.identifier, props.instanceCode);
                    }}
                  >
                    Generate From AI
                  </button>
                  <div className="inline relative top-5 ml-10">
                    <ScaffoldButton />
                  </div>
                </>
              ) : (
                <div>
                  <p>
                    No more tries left. Please try again after{" "}
                    {countCheck.minutesDifference} mins!
                  </p>
                </div>
              )}
            </div>
            <div className="inline text-right relative top-10">
              <TryCounter
                availableTry={allowedTries - responsesData.length}
                usedTry={responsesData.length}
              />
            </div>
          </div>
        </div>

        <div className="p-20 h-[calc(100%-260px)] bg-foggy-light overflow-hidden">
          {loader && (
            <div className="text-center">
              <LoaderInline />
              <p>This might take some time. Please be patient!</p>
            </div>
          )}
          {responsesData.length === 0 ? (
            <>
              <p className="text-[3em] text-[#C8C8C8] font-bold text-center mt-[100px] mb-[0px]">
                Prompty
              </p>
              <p className="text-[2em] font-thin text-center mt-[0px]">
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
          className={`rounded-t mt-0 bg-${props.color}`}
          style={{
            height: "24px",
            padding: "0px 15px",
            width: "fit-content",
            display: "block",
            textAlign: "center",
            color: "white",
          }}
        >
          <Tooltip html={props.helperTooltipHTML} theme="light" arrow={true}>
            <small
              style={{ fontSize: "16px", position: "relative", bottom: "2px" }}
            >
              {props.title}
            </small>

            <span className="text-[16px] relative bottom-1 ml-4">
              <FontAwesomeIcon icon={faInfoCircle} />
            </span>
          </Tooltip>
        </span>
      </label>
    </>
  );
};

const TryCounter = (props) => {
  if (props.usedTry >= 0 && props.availableTry >= 0) {
    return (
      <>
        <Tooltip
          title="AI technologies such as LLMs require significant energy and resource expenditure for their training. We are limiting the number of tries available to promote conscious usage. You can use Prompty to generate responses from AI up to 5 times every 60 minutes."
          theme="light"
          arrow={true}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          <span className="text-xl">Tries Available: </span>
          {[...Array(props.availableTry)].map((e, i) => (
            <span className="text-plum" key={i}>
              <FontAwesomeIcon icon={faStar} />
            </span>
          ))}
          {[...Array(props.usedTry)].map((e, i) => (
            <span className="text-black-30" key={i}>
              <FontAwesomeIcon icon={faStar} />
            </span>
          ))}
        </Tooltip>
      </>
    );
  }
};
