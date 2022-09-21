import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FieldErrorsImpl, FieldValues, UseFormRegister, UseFormUnregister } from "react-hook-form";
import { DataElementGenerator } from "../../../DatamaxTypes";
import { NormalPrompt, UniformPrompt } from "./DistributionParameterPrompt";

interface DataElementTemplateProps {
  deKey: string;
  questionKey: string;
  unregister: UseFormUnregister<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl<{ [x: string]: any }>;
  destroy: () => void;
}

const DataElementTemplate = ({
  deKey,
  questionKey,
  register,
  unregister,
  errors,
  destroy
}: DataElementTemplateProps) => {
  const [distribution, setDistribution] = useState(DataElementGenerator.UNIFORM);

  return (
    <div className="w-full flex flex-row mb-2">
      {/* <div className="flex w-fit p-3">
        <FontAwesomeIcon icon={faChartSimple} size={"xl"} />
      </div> */}
      <div className="flex w-fit p-3">
        <button className="btn-rose" onClick={() => {
          unregister(`${questionKey}/de/${deKey}/name`);
          unregister(`${questionKey}/de/${deKey}/generator`);
          unregister(`${questionKey}/de/${deKey}/min`);
          unregister(`${questionKey}/de/${deKey}/max`);
          unregister(`${questionKey}/de/${deKey}/mean`);
          unregister(`${questionKey}/de/${deKey}/std`);
          destroy();
        }} aria-label={"delete data element"}>
          <FontAwesomeIcon icon={faTrash} size={"xl"} />
        </button>
      </div>
      <div className="flex-1">
        <p className="text-lg">
          Generate a field titled{" "}
          <input
            className={`w-30 px-2 py-1 border rounded ${
              errors[`${questionKey}/de/${deKey}/name`]
                ? "border-red-700"
                : "border-black"
            }`}
            {...register(`${questionKey}/de/${deKey}/name`, { required: true })}
          />{" "}
          from a{" "}
          <select
            className="w-30 px-2 py-1 mt-1 border rounded border-black"
            {...register(`${questionKey}/de/${deKey}/generator`, {
              onChange: (e) =>
                setDistribution(e.target.value as DataElementGenerator),
            })}
          >
            {Object.values(DataElementGenerator).map((s) => (
              <option value={s} key={`${questionKey}/de/${deKey}/generator/${s}`}>{s}</option>
            ))}
          </select>{" "}
          distribution{" "}
          {distribution === DataElementGenerator.UNIFORM && (
            <UniformPrompt {...{ questionKey, deKey, register, errors }} />
          )}
          {distribution === DataElementGenerator.NORMAL && (
            <NormalPrompt {...{ questionKey, deKey, register, errors }} />
          )}
        </p>
      </div>
    </div>
  );
};

export default DataElementTemplate;
