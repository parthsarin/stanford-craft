const functions = require("firebase-functions");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

// Upgrading to v2!
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// Modules
const { broadcastMessage } = require("./messages");
const { endQuiz } = require("./quiz");
const { openAiTextCompletion } = require("./prompty/textCompletionOpenAi");
const { openAiModeration } = require("./prompty/moderationOpenAi");

const { initializeApp } = require("firebase-admin/app");
initializeApp();

exports.endQuiz = functions.https.onCall(async (data, context) => {
  if (!data || !data.joinCode) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Quiz join code is required"
    );
  }
  const joinCode = data.joinCode;

  // get the template from the database
  const db = getFirestore();
  const doc = await db.collection("datamax").doc(joinCode).get();
  if (!doc.exists) {
    throw new functions.https.HttpsError("not-found", "No such document!");
  }

  // validate that the user is the owner
  const isOwner = context.auth.uid === doc.data().owner;
  if (!isOwner) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "You are not the owner of this quiz"
    );
  }

  // confirm that there are responses
  const responses = await db
    .collection("datamax")
    .doc(joinCode)
    .collection("responses")
    .get();
  if (responses.empty) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "There are no responses to this quiz"
    );
  }

  endQuiz(doc, responses);

  // update the user's document to put the quiz in the "completed" state
  const userDoc = db.collection("users").doc(context.auth.uid);
  await userDoc.update({
    "datamax.activeQuizzes": FieldValue.arrayRemove(joinCode),
    "datamax.pastQuizzes": FieldValue.arrayUnion(joinCode),
  });

  return {
    success: true,
  };
});

exports.broadcastMessage = onDocumentCreated(
  "messages/{messageId}",
  (event) => {
    const db = getFirestore();
    broadcastMessage(db, event);
  }
);

async function getPromptyInstanceTryLimit(code) {
  const db = getFirestore();
  const doc = await db.collection("prompty").doc(code).get();
  if (!doc.exists) {
    throw new functions.https.HttpsError("not-found", "No such document!");
  }

  return doc.data().tryLimit;
}

async function getCurrentGenerations(code, userId) {
  const db = getFirestore();
  const doc = await db
    .collection("prompty")
    .doc(code)
    .collection("instances")
    .doc(userId)
    .get();
  if (!doc.exists) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Valid User Not Found!"
    );
  }
  if (doc.data()?.generations === undefined) {
    return [];
  }
  return doc.data().generations;
}

async function checkIfTeacher(userId) {
  const db = getFirestore();
  const doc = await db.collection("users").doc(userId).get();
  if (!doc.exists) {
    throw new functions.https.HttpsError("permission-denied", "User Not Found");
  }
  let role = doc.data()?.role;
  if (role === "teacher") {
    return true;
  }
  return false;
}

exports.moderatePromptAndCreateCompletion = functions
  .region("us-central1")
  .https.onCall(async (data, context) => {
    try {
      //get the responses already generated
      const currentGenerations = await getCurrentGenerations(
        data.instanceId,
        data.userId
      );

      //check if the role of the user is teacher
      const isTeacher = await checkIfTeacher(data.userId);

      if (isTeacher) {
        //unlimited tries if teacher
        return await moderateAndCreateCompletion(
          data.prompt,
          data.scaffoldMode,
          data.instanceId,
          data.userId,
          currentGenerations
        );
      } else {
        //Get the tryLimit Count of the Instance
        const instanceTryLimits = await getPromptyInstanceTryLimit(
          data.instanceId
        );

        //Get the number of tries by the user
        const userTriesCount = currentGenerations.length;

        //Check if the user hasn't exhausted the tries
        if (instanceTryLimits <= userTriesCount) {
          throw new functions.https.HttpsError(
            "permission-denied",
            "You have already exhausted the maximum number of tries!"
          );
        }
        return await moderateAndCreateCompletion(
          data.prompt,
          data.scaffoldMode,
          data.instanceId,
          data.userId,
          currentGenerations
        );
      }
    } catch (e) {
      throw new functions.https.HttpsError("unknown", e);
    }
  });

async function moderateAndCreateCompletion(
  prompt,
  scaffoldMode,
  instanceCode,
  userId,
  currentGeneratedResponses
) {
  let promptText = "";
  //construct prompt according to scaffoldMode
  if (scaffoldMode) {
    promptText =
      "Role: " +
      prompt.roleText +
      "Context: " +
      prompt.contextText +
      "Task: " +
      prompt.taskText;
  } else {
    promptText = prompt.openPromptText;
  }

  //Moderate the prompt to check if it's inappropriate
  let response = await openAiModeration(promptText);
  if (response.flagged === true) {
    //If moderation flag is true, return flagged
    return { success: true, flagged: true };
  } else if (response.flagged === false) {
    //If moderation flag is false, call OpenAI to generate text completion for the prompt
    let obj;
    let responsesData = await openAiTextCompletion(
      "Response should be suitable for young students. Strongly refrain from using any profanity, hate, or sexual references. Following is the prompt: \n" +
        promptText
    );

    //save openAI response to the user's firestore data
    //create object according to the scaffold mode
    if (scaffoldMode) {
      obj = {
        scaffold: true,
        role: prompt.roleText,
        context: prompt.contextText,
        task: prompt.taskText,
        iterations: responsesData,
      };
    } else {
      obj = {
        scaffold: false,
        promptText: prompt.openPromptText,
        iterations: responsesData,
      };
    }

    let saveResponse = await saveAiResponseToFirestore(instanceCode, userId, [
      obj,
      ...currentGeneratedResponses,
    ]);

    if (saveResponse.success) {
      return { success: true, flagged: false };
    }
  }
}

async function saveAiResponseToFirestore(
  instanceCode,
  userId,
  generatedResponses
) {
  const db = getFirestore();
  const userDoc = db
    .collection("prompty")
    .doc(instanceCode)
    .collection("instances")
    .doc(userId);
  await userDoc.set({ generations: generatedResponses }, { merge: true });

  return {
    success: true,
  };
}
