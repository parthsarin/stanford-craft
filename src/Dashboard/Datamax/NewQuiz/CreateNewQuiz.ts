import { FieldValues } from "react-hook-form";
import { 
  QuizTemplate, 
  QuestionTemplate,
  ResponseType,
  ResponseTemplate,
  DataElementTemplate
} from '../DatamaxTypes';
import {
  getFirestore,
  doc, getDoc, setDoc, arrayUnion, serverTimestamp
} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

/*
My database template -- putting this here for now:

users/
  uid/
    datamax:
      activeQuizzes: [gid, gid, gid]
      pastQuizzes: [gid, gid, gid]

datamax-active/
  joinCode/
    template: 

datamax-past/
  gid/
    template:
*/

export async function createNewQuiz(data: FieldValues, questions: string[]) {
  // 1. Generate QuizTemplate from data
  const qt = parseQuizTemplate(data, questions);

  // 2. Add some extra information
  const joinCode = await generateQuizJoinCode();

  // 3. Push result to firebase
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  const db = getFirestore();
  const docRef = doc(db, 'datamax-active', joinCode);
  await setDoc(docRef, {
    template: qt,
    owner: uid,
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

async function generateQuizJoinCode() {
  while (true) {
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const db = getFirestore();
    const docRef = doc(db, 'datamax-active', joinCode);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) return joinCode;
  }
}

function parseQuizTemplate(data: FieldValues, questions: string[]) {
  let output: QuizTemplate = {
    name: data.name,
    questions: []
  };

  for (const questionKey of questions) {
    output.questions.push(
      parseQuestionTemplate(data, questionKey)
    );
  }

  return output
}

function parseQuestionTemplate(data: FieldValues, questionKey: string) {
  let output: QuestionTemplate = {
    prompt: data[`${questionKey}/prompt`],
    dataElements: [],
    response: {
      type: data[`${questionKey}/response/type`] as ResponseType,
    } as ResponseTemplate
  };

  // If type is multiple choice, add choices
  if (output.response.type === ResponseType.MULTIPLE_CHOICE) {
    output.response.choices = (
      data[`${questionKey}/response/choices`]
        .split(',')
        .map((choice: string) => choice.trim())
    );
  }

  // Add data elements
  const deKeys = findDataElementKeys(data, questionKey);
  deKeys.forEach((deKey) => {
    output.dataElements.push(
      parseDataElementTemplate(data, questionKey, deKey)
    );
  })

  return output;
}

function findDataElementKeys(data: FieldValues, questionKey: string) {
  let output: Set<string> = new Set();

  for (const key in data) {
    if (key.startsWith(`${questionKey}/de/`)) {
      output.add(key.split('/')[2]);
    }
  }

  return output;
}

function parseDataElementTemplate(
  data: FieldValues, 
  questionKey: string, 
  deKey: string
) {
  let output = {
    name: data[`${questionKey}/de/${deKey}/name`],
    generator: data[`${questionKey}/de/${deKey}/generator`],
  } as DataElementTemplate;

  switch (output.generator) {
    case 'Uniform':
      output.min = parseFloat(data[`${questionKey}/de/${deKey}/min`]);
      output.max = parseFloat(data[`${questionKey}/de/${deKey}/max`]);
      break;

    case 'Normal':
      output.mean = parseFloat(data[`${questionKey}/de/${deKey}/mean`]);
      output.std = parseFloat(data[`${questionKey}/de/${deKey}/std`]);
      break;
  }

  return output;
}