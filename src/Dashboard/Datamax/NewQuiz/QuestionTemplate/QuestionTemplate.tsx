import { useState } from "react";

import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";

import { generateUUID } from "../GenerateDefaults";
import DataElementTemplate from "./DataElementTemplate";

interface QuestionTemplateProps {
  questionKey: string,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrorsImpl<{[x: string]: any}>
}


const QuestionTemplate = ({ questionKey, register, errors }: QuestionTemplateProps) => {
  const [dataElements, setDataElements] = useState<{ [x: string]: null}>({});

  const handleDestroy = (id: string) => () => {
    let newDataElements = {...dataElements};
    delete newDataElements[id];

    setDataElements(newDataElements);
  }

  return (
    <div className="flex flex-col w-4/5 md:w-1/2 rounded border border-black p-2 mb-3">
      <input
        type="text"
        className={`w-full h-fit text-center text-xl focus:ring-0 focus:border-0 focus:outline-none mb-2 rounded p-1 ${
          errors[`${questionKey}/prompt`] && 'ring-1 ring-red-700'
        }`}
        placeholder="What question should students answer?"
        {...register(`${questionKey}/prompt`, { required: true })}
      ></input>

      {
        Object.keys(dataElements).map((deKey) => (
          <DataElementTemplate 
            deKey={deKey} 
            questionKey={questionKey} 
            register={register} 
            errors={errors} 
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
    </div>
  );
};

export default QuestionTemplate;