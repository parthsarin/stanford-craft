import { Fragment } from "react";
import { Question as RawQuestion, ResponseType } from "../../../DatamaxTypes";
import DistributionGraph from "./DistributionGraph";
import Select from "react-select";

interface QuestionProps {
  question: RawQuestion;
  onChange: (response: string) => void;
}

const Question = ({ question, onChange }: QuestionProps) => {
  const { prompt, dataElements, response, id } = question;
  return (
    <div className="flex flex-col p-20">
      <div className="flex flex-row justify-center mb-20">
        <h2 className="type-2">{prompt}</h2>
      </div>
      {dataElements.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 type-1 gap-y-2 mb-20">
          {dataElements.map((de) => (
            <Fragment key={`${id}/${de.id}`}>
              <p className="col-span-1 font-bold">{de.name}: </p>
              <p className="col-span-1 text-center">{de.value}</p>
              <div className="col-span-2">
                <DistributionGraph {...de} />
              </div>
            </Fragment>
          ))}
        </div>
      )}
      <div className="flex flex-row justify-center items-center mb-0">
        {response.type === ResponseType.MULTIPLE_CHOICE && (
          <>
            <p className="type-1 font-bold mr-20 mb-0">Answer:</p>
            <Select
              className="select-container w-full md:w-2/3"
              options={response.choices?.map((option) => ({
                value: option,
                label: option
              }))}
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
                if (e) onChange(e.value);
              }}
              placeholder="Select an answer"
            />
          </>
        )}
        {response.type === ResponseType.SHORT_ANSWER && (
          <textarea
            className={`
            w-full border border-black type-2 rounded p-3
            h-32
          `}
            placeholder="Type your answer here..."
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default Question;
