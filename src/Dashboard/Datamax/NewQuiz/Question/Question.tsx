import { faDatabase, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent } from "react";
import { generateUUID } from "../../../../Generic/UUID";
import { 
  DataElementTemplate, 
  generateBlankDataElement, 
  QuestionTemplate, 
  ResponseTemplate
} from "../../DatamaxTypes";
import DataElement from "./DataElement";
import Response from './Response';

interface QuestionProps {
  data: QuestionTemplate;
  onDelete: () => void;
  onUpdate: (data: QuestionTemplate) => void;
}

const Question = ({ data, onDelete, onUpdate }: QuestionProps) => {
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

  const updateDataElement = (dataElementKey: string) => (newData: DataElementTemplate) => {
    const newDataElements = { ...data.dataElements };
    newDataElements[dataElementKey] = newData;
    onUpdate({ ...data, dataElements: newDataElements });
  };

  // response helper function
  const updateResponse = (newResponse: ResponseTemplate) => {
    onUpdate({ ...data, response: newResponse });
  }
  

  return (
    <div className="relative w-4/5 lg:w-1/2 rounded border border-black p-2 mb-3 z-0">
      {/* delete button */}
      <button
        className="text-xl absolute right-0 top-0 -translate-y-3 translate-x-2"
        aria-label={"delete question"}
        onClick={onDelete}
      >
        <FontAwesomeIcon
          icon={faXmarkCircle}
          className="bg-white rounded-full"
        />
      </button>
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

      {/* add data element */}
      <button
        className="flex flex-row w-full rounded border border-black border-dashed p-2 justify-center items-center text-xl hover:bg-gray-100"
        onClick={addDataElement}
      >
        <FontAwesomeIcon icon={faDatabase} className="mr-2" />
        Add Data Element
      </button>

      {/* response */}
      <Response data={data.response} onUpdate={updateResponse} />
    </div>
  );
}

export default Question;