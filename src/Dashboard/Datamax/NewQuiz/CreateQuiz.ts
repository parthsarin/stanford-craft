import { getAuth } from "firebase/auth";
import { arrayUnion, doc, getDoc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { QuizTemplate } from "../DatamaxTypes";

async function generateQuizJoinCode() {
  while (true) {
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const db = getFirestore();
    const docRef = doc(db, 'datamax', joinCode);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) return joinCode;
  }
}

/**
 * Flattens the quiz by removing the map variables (which we originally kept to
 * easily delete pieces of the quiz)
 * 
 * @param quiz The quiz returned from the form
 */
function flattenQuizForDatabase(quiz: QuizTemplate) {
  const quizForDatabase: any = { ...quiz };

  // flatten the question data
  const questions = Object.entries(quiz.questions).map(([key, value]) => {
    return { ...value, id: key };
  });
  quizForDatabase.questions = questions;

  // flatten the data elements
  quizForDatabase.questions.forEach(
    (question: any) => {
      // pull out the data element from the original quiz question (which is a map)
      const dataElements = Object.entries(quiz.questions[question.id].dataElements).map(
        ([key, value]) => {
          return { ...value, id: key };
        }
      );
      question.dataElements = dataElements;
    }
  );

  return quizForDatabase;
}

export default async function createQuiz(quiz: QuizTemplate) {
  // 1. Get the flattened quiz from the details of this quiz
  const qt = flattenQuizForDatabase(quiz);

  // 2. Generate a join code for this quiz
  const joinCode = await generateQuizJoinCode();

  // 3. Push the quiz to the database
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  const db = getFirestore();
  const docRef = doc(db, 'datamax', joinCode);
  await setDoc(docRef, {
    template: qt,
    owner: uid,
    active: true,
    createdAt: serverTimestamp(),
  });

  // 4. Add quiz to user's list of active quizzes
  const userDoc = doc(db, 'users', uid);
  await setDoc(userDoc, {
    "datamax": {
      activeQuizzes: arrayUnion(joinCode)
    }
  }, { merge: true });

  return joinCode;
}