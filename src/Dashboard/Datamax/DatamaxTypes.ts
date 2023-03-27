import { Timestamp } from "firebase/firestore";

enum DataElementGenerator {
  UNIFORM = 'Uniform',
  NORMAL = 'Normal',
}

interface DataElementTemplate {
  name: string,
  generator: DataElementGenerator,
  min?: number,
  max?: number,
  mean?: number,
  std?: number,
  round?: number,
}

enum ResponseType {
  SHORT_ANSWER = 'short answer',
  MULTIPLE_CHOICE = 'multiple choice',
}

interface ResponseTemplate {
  type: ResponseType,
  choices?: string[]
}

interface QuestionTemplate {
  prompt: string;
  dataElements: { [key: string]: DataElementTemplate };
  response: ResponseTemplate;
}

interface QuizTemplate {
  name: string,
  questions: { [key: string]: QuestionTemplate }
}

interface QuizPreviewCardProps {
  quiz: QuizTemplate,
  joinCode: string,
  createdAt: Timestamp,
}

function generateBlankQuiz(): QuizTemplate {
  return {
    name: '',
    questions: {},
  };
}

function generateBlankQuestion(): QuestionTemplate {
  return {
    prompt: '',
    dataElements: {},
    response: {
      type: ResponseType.SHORT_ANSWER,
    },
  };
}

function generateBlankDataElement(): DataElementTemplate {
  return {
    name: '',
    generator: DataElementGenerator.UNIFORM,
    min: 0,
    max: 10,
    round: 2
  };
}

export {
  ResponseType,
  DataElementGenerator,
  generateBlankQuiz,
  generateBlankQuestion,
  generateBlankDataElement,
}
export type { 
  QuizTemplate,
  QuestionTemplate,
  DataElementTemplate,
  ResponseTemplate,
  QuizPreviewCardProps,
};