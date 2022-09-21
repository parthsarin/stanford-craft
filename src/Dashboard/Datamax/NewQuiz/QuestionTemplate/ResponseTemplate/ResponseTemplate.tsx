import { useState } from "react";
import { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";
import { ResponseType } from "../../../DatamaxTypes";

interface ResponseTemplateProps {
  questionKey: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl<{ [x: string]: any }>;
}

const ResponseTemplate = ({ questionKey, register, errors }: ResponseTemplateProps) => {
  const [responseType, setResponseType] = useState(ResponseType.SHORT_ANSWER);

  return (
    <span className="text-xl">
      Accept{" "}
      <select
        className="w-30 px-2 py-1 mt-2 mx-1 border rounded border-black"
        {...register(`${questionKey}/response/type`, {
          value: responseType,
          onChange: (e) => setResponseType(e.target.value),
        })}
      >
        {Object.values(ResponseType).map((s) => (
          <option key={`${questionKey}/response/type/${s}`} value={s}>{s}</option>
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
            className={`w-30 px-2 py-1 mt-1 border rounded ${
              errors[`${questionKey}/response/choices`]
                ? "border-red-700"
                : "border-black"
            }`}
            {...register(`${questionKey}/response/choices`, {
              required: true
            })}
          />
        </>
      )}
      .
    </span>
  );
};

export default ResponseTemplate;
