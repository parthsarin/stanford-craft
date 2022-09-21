import { FieldValues } from "react-hook-form";

/*
My database template -- putting this here for now:

users/
	uid/
		datamax/
			activeGames: [gid, gid, gid]
			pastGames: [gid, gid, gid]

datamax/
	activeGames/
		gid/
			joinCode: 
			template: 
	pastGames/
*/

export function createNewQuiz(data: FieldValues, questions: string[]) {
  // 1. Generate QuizTemplate from data
  // 2. Add some extra information
  // 3. Push result to firebase

  console.log({...data, questions});
}