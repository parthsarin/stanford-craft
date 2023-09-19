import { useState, useEffect } from "react";
import { Tooltip } from "react-tippy";
const GeneratedResponses = (props) => {
  const [selectedResponse, setSelectedResponse] = useState(0);
  useEffect(() => {
    setSelectedResponse(0);
  }, [props]);
  return (
    <>
      <div className="mb-10">
        <h5 className="inline text-black-90">Generated by AI</h5>
        <div className="inline relative bottom-4">
          <button
            className={`${
              selectedResponse <= 0 ? "bg-black-20" : "bg-plum"
            } text-white ml-10 mr-2 px-15 py-5 rounded text-[0.8em]`}
            disabled={selectedResponse <= 0 ? true : false}
            onClick={() => {
              setSelectedResponse(selectedResponse - 1);
            }}
          >
            Next
          </button>
          <button
            className={`${
              selectedResponse + 1 < props.responses.length
                ? "bg-plum"
                : "bg-black-20"
            } text-white ml-2 px-15 py-5 rounded text-[0.8em]`}
            disabled={
              selectedResponse + 1 < props.responses.length ? false : true
            }
            onClick={() => {
              setSelectedResponse(selectedResponse + 1);
            }}
          >
            Prev
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-50px)] text-[17px]">
        {props.responses[selectedResponse].scaffold ? (
          // Scaffolded Prompt
          <div className="mx-10 mb-2">
            <div className="mb-0 mt-0 " style={{ lineHeight: "26px" }}>
              <Tooltip title="Role" arrow={true}>
                <span
                  className="mr-6 px-6"
                  style={{ backgroundColor: "#0000ff26" }}
                >
                  {props.responses[selectedResponse].role}
                </span>
              </Tooltip>
              <Tooltip title="Context" arrow={true}>
                <span
                  className="mr-6 px-6"
                  style={{ backgroundColor: "#00800026" }}
                >
                  {props.responses[selectedResponse].context}
                </span>
              </Tooltip>
              <Tooltip title="Task" arrow={true}>
                <span
                  className="mr-6 px-6 my-8"
                  style={{ backgroundColor: "#a52a2a26" }}
                >
                  {props.responses[selectedResponse].task}
                </span>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className="mx-10 mb-6">
            <p className="mb-0">
              {props.responses[selectedResponse].promptText}
            </p>
          </div>
        )}

        <IndividualTry
          iterations={props.responses[selectedResponse].iterations}
        />
      </div>
    </>
  );
};

function removeInitialNewlinesAndSpaces(str) {
  while (str.startsWith("\n") || str.startsWith(" ")) {
    str = str.slice(1);
  }
  return str;
}

const IndividualTry = (props) => {
  return (
    <>
      <div
        className="grid grid-cols-3 h-full"
        style={{ gridTemplateRows: "90%" }}
      >
        {props.iterations.map((iteration, i) => {
          return (
            <div
              className="m-10 shadow-lg bg-white p-10 overflow-y-scroll"
              key={i}
            >
              <span className="relative bg-black-50 px-8 py-2 text-[14px] rounded text-white">
                Option {i + 1}
              </span>
              <p className="whitespace-pre-wrap mt-4 text-[0.9em]">
                {removeInitialNewlinesAndSpaces(iteration.text)}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GeneratedResponses;
