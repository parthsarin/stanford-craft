import { useState } from "react";
import { generateUUID } from "../../../../../Generic/UUID";
import { ResponseTemplate, ResponseType } from "../../../DatamaxTypes";

interface ResponseProps {
  data: ResponseTemplate;
  onUpdate: (data: ResponseTemplate) => void;
}

const Response = ({ data, onUpdate }: ResponseProps) => {
  const [responseType, setResponseType] = useState<ResponseType>(data.type);
  const [choicesString, setChoicesString] = useState<string>(
    data.choices ? data.choices.join(", ") : ""
  );
  const questionKey = generateUUID();

  return (
    <span className="type-2">
      Accept{" "}
      <select
        className="w-30 px-2 py-1 mt-2 mx-1 border rounded border-black"
        value={responseType}
        onChange={(e) => {
          setResponseType(e.target.value as ResponseType);
          onUpdate({ ...data, type: e.target.value as ResponseType });
        }}
      >
        {Object.values(ResponseType).map((s) => (
          <option key={`${questionKey}/${s}`} value={s}>
            {s}
          </option>
        ))}
      </select>{" "}
      responses
      {responseType === ResponseType.MULTIPLE_CHOICE && (
        <>
          {" "}
          from the following choices:{" "}
          <input
            type="text"
            placeholder="(comma-separated)"
            className={`w-30 px-2 py-1 mt-1 border rounded`}
            value={choicesString}
            onChange={(e) => {
              // update the string, which controls the value of the input
              setChoicesString(e.target.value);

              // update the choices, which is what we actually want to save
              onUpdate({
                ...data,
                choices: e.target.value
                  .split(",")
                  .map((choice: string) => choice.trim()),
              });
            }}
          />
        </>
      )}
      .
    </span>
  );
};

export default Response;
