import { Fragment } from 'react';
import { Question as RawQuestion, ResponseType } from '../../../DatamaxTypes';
import DistributionGraph from './DistributionGraph';

interface QuestionProps {
  question: RawQuestion;
  onChange: (response: string) => void;
}

const Question = ({ question, onChange }: QuestionProps) => {
  const { prompt, dataElements, response, id } = question;
  return (
    <div className="flex flex-col mb-4">
      <div className="flex flex-row justify-center mb-6">
        <h2 className="text-xl">{prompt}</h2>
      </div>
      {dataElements.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 text-lg gap-y-2 mb-6">
          {dataElements.map((de) => (
            <Fragment key={`${id}/${de.id}`}>
              <p className="col-span-1 font-bold">
                {de.name}:{" "}
              </p>
              <p className="col-span-1 text-center">
                {de.value}
              </p>
              <div className="col-span-2">
                <DistributionGraph {...de} />
              </div>
            </Fragment>
          ))}
        </div>
      )}
      <div className="flex flex-row justify-center items-center">
        {response.type === ResponseType.MULTIPLE_CHOICE && (
          <>
            <p className="text-lg font-bold mr-5">Answer:</p>
            <select
              className={`w-full md:w-2/3 text-center text-xl rounded rounded-md py-2
                border border-black text-black`}
              onChange={(e) => onChange(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled></option>
              {response.choices?.map((option) => (
                <option key={`${id}/${option}`}>{option}</option>
              ))}
            </select>
          </>
        )}
        {
        response.type === ResponseType.SHORT_ANSWER 
        && <textarea 
          className={`
            w-full border border-black text-xl rounded rounded-md p-3
            h-32
          `}
          placeholder="Type your answer here..."
          onChange={(e) => onChange(e.target.value)}
        />
        }
      </div>
    </div>
  );
};

export default Question;