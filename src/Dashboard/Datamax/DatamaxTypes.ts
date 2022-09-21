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
  std?: number
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
  dataElements: DataElementTemplate[];
  response: ResponseTemplate;
}

interface QuizTemplate {
  name: string,
  questions: QuestionTemplate[]
}

export {
  ResponseType,
  DataElementGenerator
}
export type { 
  QuizTemplate,
  QuestionTemplate,
  DataElementTemplate,
  ResponseTemplate
};