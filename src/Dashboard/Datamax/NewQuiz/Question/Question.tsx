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
  data: QuestionTemplate;
  onDelete: () => void;
  onUpdate: (data: QuestionTemplate) => void;
  onDuplicate: () => void;
}

const Question = ({ data, onDelete, onUpdate, onDuplicate }: QuestionProps) => {
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
    <div className="relative w-4/5 lg:w-1/2 rounded border border-black p-2 mb-3 z-0">
      {/* question title */}
      <input
        type="text"
        className={`w-full h-fit text-center text-xl focus:ring-0 focus:border-0 focus:outline-none mb-2 rounded p-1`}
        placeholder="What question should students answer?"
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
      <div className="mt-4 flex flex-row w-full justify-around space-x-2">
        <button
          className="px-3 py-2 hover:bg-blue-400 bg-blue-300 rounded border"
          onClick={addDataElement}
        >
          <FontAwesomeIcon icon={faDatabase} className="mr-2" />
          Add data element
        </button>
        <button
          className="px-3 py-2 hover:bg-orange-400 bg-orange-300 rounded border"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDuplicate();
          }}
        >
          <FontAwesomeIcon icon={faCopy} className="mr-2" />
          Duplicate
        </button>
        <button
          className="px-3 py-2 hover:bg-red-400 bg-red-300 rounded border"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default Question;
