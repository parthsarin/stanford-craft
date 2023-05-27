import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { generateUUID } from "../../../../../Generic/UUID";
import {
  DataElementGenerator,
  DataElementTemplate,
} from "../../../DatamaxTypes";
import { UniformPrompt, NormalPrompt } from "./DistributionParameterPrompts";

interface DataElementProps {
  data: DataElementTemplate;
  onDelete: () => void;
  onUpdate: (data: DataElementTemplate) => void;
}

const DataElement = ({ data, onDelete, onUpdate }: DataElementProps) => {
  const [distribution, setDistribution] = useState(data.generator);

  const deKey = generateUUID();

  // updateDistribution allows the parameter prompt fields to inject values into
  // the data element which is then passed up to the parent component
  const updateDistribution = (params: any) => {
    const newData: DataElementTemplate = {
      name: data.name,
      generator: data.generator,
      round: data.round,
    };

    // only copy the properties for this distribution
    if (data.generator === DataElementGenerator.UNIFORM) {
      newData.min = data.min;
      newData.max = data.max;
    } else if (data.generator === DataElementGenerator.NORMAL) {
      newData.mean = data.mean;
      newData.std = data.std;
    }

    onUpdate({ ...newData, ...params } as DataElementTemplate);
  };

  return (
    <div className="w-full flex flex-row mb-2">
      {/* delete button */}
      <div className="flex w-fit p-3">
        <button
          className="btn-rose"
          onClick={onDelete}
          aria-label={"delete data element"}
        >
          <FontAwesomeIcon icon={faTrash} size={"xl"} />
        </button>
      </div>

      {/* prompt for the data element */}
      <div className="flex-1">
        <p className="type-1">
          Generate a field titled{" "}
          <input
            className={`w-30 px-2 py-1 border rounded`}
            value={data.name}
            onChange={(e) => {
              e.preventDefault();
              onUpdate({ ...data, name: e.target.value });
            }}
          />{" "}
          from a{" "}
          <select
            className="w-30 px-2 py-1 mt-1 border rounded border-black"
            value={data.generator}
            onChange={(e) => {
              e.preventDefault();
              onUpdate({
                ...data,
                generator: e.target.value as DataElementGenerator,
              });
              setDistribution(e.target.value as DataElementGenerator);
            }}
          >
            {Object.values(DataElementGenerator).map((s) => (
              <option value={s} key={`${deKey}/${s}`}>
                {s}
              </option>
            ))}
          </select>{" "}
          distribution{" "}
          {distribution === DataElementGenerator.UNIFORM && (
            <UniformPrompt onUpdate={updateDistribution} data={data} />
          )}
          {distribution === DataElementGenerator.NORMAL && (
            <NormalPrompt onUpdate={updateDistribution} data={data} />
          )}
        </p>
      </div>
    </div>
  );
};

export default DataElement;
