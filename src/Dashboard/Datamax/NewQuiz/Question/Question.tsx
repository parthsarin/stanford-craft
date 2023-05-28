import { faCopy, faDatabase, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent } from "react";
import { generateUUID } from "../../../../Generic/UUID";
import {
  DataElementTemplate,
  generateBlankDataElement,
  QuestionTemplate,
  ResponseTemplate,
} from "../../DatamaxTypes";
import DataElement from "./DataElement";
import Response from "./Response";

interface QuestionProps {
  key: string,
  data: QuestionTemplate;
  onDelete: () => void;
  onUpdate: (data: QuestionTemplate) => void;
  onDuplicate: () => void;
}

const Question = ({ key, data, onDelete, onUpdate, onDuplicate }: QuestionProps) => {
  // data elements helper functions
  const addDataElement = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newDataElements = { ...data.dataElements };
    newDataElements[generateUUID()] = generateBlankDataElement();
    onUpdate({ ...data, dataElements: newDataElements });
  };

  const deleteDataElement = (dataElementKey: string) => () => {
    const newDataElements = { ...data.dataElements };
    delete newDataElements[dataElementKey];
    onUpdate({ ...data, dataElements: newDataElements });
  };

  const updateDataElement =
    (dataElementKey: string) => (newData: DataElementTemplate) => {
      const newDataElements = { ...data.dataElements };
      newDataElements[dataElementKey] = newData;
      onUpdate({ ...data, dataElements: newDataElements });
    };

  // response helper function
  const updateResponse = (newResponse: ResponseTemplate) => {
    onUpdate({ ...data, response: newResponse });
  };

  return (
    <div className="relative w-4/5 lg:w-1/2 bg-stone-light p-20 mb-20 z-0">
      {/* question title */}
      <label htmlFor={`${key}-title`} className="mb-5">
        What question should students answer?
      </label>
      <input
        type="text"
        id={`${key}-title`}
        className={`input w-full mb-20`}
        placeholder=""
        value={data.prompt}
        onChange={(e) => onUpdate({ ...data, prompt: e.target.value })}
      ></input>

      {/* data elements */}
      {Object.entries(data.dataElements).map(([key, value]) => (
        <DataElement
          data={value}
          key={key}
          onDelete={deleteDataElement(key)}
          onUpdate={updateDataElement(key)}
        />
      ))}

      {/* response */}
      <Response data={data.response} onUpdate={updateResponse} />

      {/* delete and duplicate button */}
      <div className="mt-20 flex flex-row w-full flex-wrap">
        <button
          className="btn-digital-blue mr-10 mb-10"
          onClick={addDataElement}
        >
          <FontAwesomeIcon icon={faDatabase} className="mr-10" />
          <span>Add randomly generated value</span>
        </button>
        <button
          className="btn-poppy mr-10 mb-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDuplicate();
          }}
        >
          <FontAwesomeIcon icon={faCopy} className="mr-10" />
          <span>Duplicate</span>
        </button>
        <button
          className="btn-digital-red mr-10 mb-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-10" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default Question;
