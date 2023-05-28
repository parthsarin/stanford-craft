import { useState } from "react";
import { ResponseTemplate, ResponseType } from "../../../DatamaxTypes";
import Select from 'react-select';

interface ResponseProps {
  data: ResponseTemplate;
  onUpdate: (data: ResponseTemplate) => void;
}

const Response = ({ data, onUpdate }: ResponseProps) => {
  const [responseType, setResponseType] = useState<ResponseType>(data.type);
  const [choicesString, setChoicesString] = useState<string>(
    data.choices ? data.choices.join(", ") : ""
  );

  return (
    <>
    <span>What type of response should students provide?</span>
    <Select
      className="select-container"
      options={Object.values(ResponseType).map((s) => ({
        value: s,
        label: s
      }))}
      value={{ value: responseType, label: responseType }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "1.8rem",
          lineHeight: "1.3",
          borderRadius: 0,
          borderColor: "#6b7280",
          "&:hover": {
            borderColor: "#6b7280",
          },
        }),
      }}
      onChange={(e) => {
        if (!e) return;
        setResponseType(e.value as ResponseType);
        onUpdate({ ...data, type: e.value as ResponseType });
      }}
      placeholder="Select an answer"
    />
    {responseType === ResponseType.MULTIPLE_CHOICE && (
      <>
        <p className="mt-10 mb-0">What options can students choose from?</p>
        <input
          type="text"
          placeholder="(enter a comma-separated list)"
          className={`input w-full mb-20`}
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
    </>
  );
};

export default Response;
