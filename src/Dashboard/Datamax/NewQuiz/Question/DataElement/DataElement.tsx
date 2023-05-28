import { faTrash, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { generateUUID } from "../../../../../Generic/UUID";
import {
  DataElementGenerator,
  DataElementTemplate,
} from "../../../DatamaxTypes";
import { UniformPrompt, NormalPrompt } from "./DistributionParameterPrompts";
import Select from 'react-select';

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
    <div className="w-full flex flex-col mb-20 bg-stone/30 p-20 relative">
      {/* prompt for the data element */}
      <div>
        <p style={{lineHeight: "3rem"}} className="mb-0">
          Show students a randomly-generated value titled{" "}
          <input
            className={`input inline w-228 p-3 mb-5`}
            value={data.name}
            onChange={(e) => {
              e.preventDefault();
              onUpdate({ ...data, name: e.target.value });
            }}
          />{" "}
          generated from a{" "}
          <div className="inline-block mb-5 mr-5">
          <Select
            className="select-container"
            options={Object.values(DataElementGenerator).map((s) => ({
              value: s,
              label: s
            }))}
            value={{ value: data.generator, label: data.generator }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: "1.8rem",
                lineHeight: "1.3",
                borderRadius: 0,
                width: "150px",
                borderColor: "#6b7280",
                "&:hover": {
                  borderColor: "#6b7280",
                },
              }),
            }}
            onChange={(e) => {
              if (!e) return;
              onUpdate({
                ...data,
                generator: e.value as DataElementGenerator,
              });
              setDistribution(e.value as DataElementGenerator);
            }}
            placeholder="Select an answer"
          />
          </div>
          distribution{" "}
          {distribution === DataElementGenerator.UNIFORM && (
            <UniformPrompt onUpdate={updateDistribution} data={data} />
          )}
          {distribution === DataElementGenerator.NORMAL && (
            <NormalPrompt onUpdate={updateDistribution} data={data} />
          )}
        </p>
      </div>
      <button
        className="type-2 absolute right-0 top-0 -translate-y-15 translate-x-15 z-10"
        aria-label={"delete data element"}
        onClick={onDelete}
      >
        <FontAwesomeIcon
          icon={faXmarkCircle}
          className="bg-white rounded-full"
        />
      </button>
    </div>
  );
};

export default DataElement;
