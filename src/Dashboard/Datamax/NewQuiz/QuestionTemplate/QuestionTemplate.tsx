import { useState } from "react";

import { faDatabase, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FieldErrorsImpl, FieldValues, UseFormRegister, UseFormUnregister } from "react-hook-form";

import { generateUUID } from "../GenerateDefaults";
import DataElementTemplate from "./DataElementTemplate";
import ResponseTemplate from "./ResponseTemplate";

interface QuestionTemplateProps {
  questionKey: string,
  unregister: UseFormUnregister<FieldValues>,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrorsImpl<{[x: string]: any}>;
  destroy: () => void;
}


const QuestionTemplate = ({ questionKey, register, unregister, errors, destroy }: QuestionTemplateProps) => {
  const [dataElements, setDataElements] = useState<{ [x: string]: null}>({});

  const handleDestroy = (id: string) => () => {
    let newDataElements = {...dataElements};
    delete newDataElements[id];

    setDataElements(newDataElements);
  }

  return (
    <div className="relative w-4/5 lg:w-1/2 rounded border border-black p-2 mb-3 z-0">
      <button
        className="text-xl absolute right-0 top-0 -translate-y-3 translate-x-2"
        aria-label={"delete question"}
        onClick={() => {
          unregister(`${questionKey}/prompt`)
          unregister(`${questionKey}/response/type`);
          unregister(`${questionKey}/response/choices`);
          destroy()
        }}
      ><FontAwesomeIcon icon={faXmarkCircle} className="bg-white rounded-full"/></button>
      <input
        type="text"
        className={`w-full h-fit text-center text-xl focus:ring-0 focus:border-0 focus:outline-none mb-2 rounded p-1 ${
          errors[`${questionKey}/prompt`] && 'placeholder:text-red-300'
        }`}
        placeholder="What question should students answer?"
        {...register(`${questionKey}/prompt`, { required: true })}
      ></input>

      {
        Object.keys(dataElements).map((deKey) => (
          <DataElementTemplate 
            key={`${questionKey}/de/${deKey}`}
            {...{ deKey, questionKey, register, errors, unregister }}
            destroy={handleDestroy(deKey)}
          />
        ))
      }

      <button
        className="flex flex-row w-full rounded border border-black border-dashed p-2 justify-center items-center text-xl hover:bg-gray-100"
        onClick={() => setDataElements({...dataElements, [generateUUID()]: null})}
      >
        <FontAwesomeIcon icon={faDatabase} className="mr-2" />
        Add Data Element
      </button>
      <ResponseTemplate {...{ questionKey, register, errors }} />
    </div>
  );
};

export default QuestionTemplate;