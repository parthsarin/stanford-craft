import { QuizDoc } from "../../Datamax/DatamaxTypes";

export default function match(query: string, quiz: QuizDoc) {
  const code = quiz.joinCode.toUpperCase();
  const name = quiz.template.name.toUpperCase();

  query = query.toUpperCase();

  const codeRe = new RegExp(`.*${query.split('').join(".*")}.*`);
  const nameRe = new RegExp(`.*${query.split(' ').join(".*")}.*`);

  return code.match(codeRe) || name.match(nameRe);
}